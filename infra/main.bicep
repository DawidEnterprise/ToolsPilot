/*  ──────────────────────────────────────────────────────────
    Azure Bicep — CHEAPEST possible deployment.

    Cost breakdown (at low/moderate traffic):
    ┌─────────────────────────────┬──────────────┐
    │ Resource                    │ Monthly Cost │
    ├─────────────────────────────┼──────────────┤
    │ Static Web Apps (Free tier) │ $0.00        │
    │ Functions (Consumption)     │ ~$0.00 *     │
    │ Storage (LRS, minimal)      │ ~$0.50       │
    │ App Insights (5 GB free)    │ $0.00        │
    ├─────────────────────────────┼──────────────┤
    │ TOTAL                       │ ~$0.50/mo    │
    └─────────────────────────────┴──────────────┘
    * First 1M executions/mo free, then $0.20/M

    When traffic grows:
    - Upgrade Static Web Apps to Standard ($9/mo) for custom auth + more bandwidth
    - Functions stay consumption-based (auto-scales, pay-per-use)
    - Add Azure CDN only when needed ($0.08/GB after free tier)

    Deploys:
      • Azure Static Web Apps (Free) — hosts Next.js static export
      • Azure Function App (Consumption) — serverless processing
      • Storage Account — blob storage for temp uploads
      • Application Insights — monitoring (5 GB/mo free)
    ────────────────────────────────────────────────────────── */

@description('Primary deployment region')
param location string = resourceGroup().location

@description('Environment name (dev, staging, prod)')
@allowed(['dev', 'staging', 'prod'])
param env string = 'prod'

@description('Base name prefix for all resources')
param baseName string = 'toolpilot'

@description('Static Web Apps SKU: Free or Standard')
@allowed(['Free', 'Standard'])
param swaSku string = 'Free'

// ── Derived names ──────────────────────────────────────────
var suffix = '${baseName}-${env}'
var swaName = 'swa-${suffix}'
var funcAppName = 'func-${suffix}'
var storageName = replace('st${suffix}', '-', '')
var funcStorageName = replace('stfn${suffix}', '-', '')
var insightsName = 'ai-${suffix}'

// ── Storage Account (uploads) ──────────────────────────────
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageName
  location: location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccount
  name: 'default'
}

resource uploadsContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: blobService
  name: 'uploads'
  properties: { publicAccess: 'None' }
}

// ── Storage Account (Functions runtime — required, separate) ─
resource funcStorageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: funcStorageName
  location: location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
}

// ── Application Insights (free up to 5 GB/mo) ─────────────
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: insightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    RetentionInDays: 30
  }
}

// ── Static Web App (FREE tier — hosts Next.js) ────────────
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: swaName
  location: location
  sku: { name: swaSku, tier: swaSku }
  properties: {}
}

// ── Consumption Plan (free tier for Functions) ─────────────
resource consumptionPlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: 'plan-${suffix}'
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
  kind: 'functionapp'
  properties: { reserved: true }
}

// ── Function App (Consumption — pay per execution) ─────────
resource funcApp 'Microsoft.Web/sites@2023-01-01' = {
  name: funcAppName
  location: location
  kind: 'functionapp,linux'
  properties: {
    serverFarmId: consumptionPlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'NODE|20'
      appSettings: [
        { name: 'AzureWebJobsStorage', value: 'DefaultEndpointsProtocol=https;AccountName=${funcStorageName};AccountKey=${funcStorageAccount.listKeys().keys[0].value};EndpointSuffix=core.windows.net' }
        { name: 'WEBSITE_CONTENTAZUREFILECONNECTIONSTRING', value: 'DefaultEndpointsProtocol=https;AccountName=${funcStorageName};AccountKey=${funcStorageAccount.listKeys().keys[0].value};EndpointSuffix=core.windows.net' }
        { name: 'WEBSITE_CONTENTSHARE', value: funcAppName }
        { name: 'FUNCTIONS_EXTENSION_VERSION', value: '~4' }
        { name: 'FUNCTIONS_WORKER_RUNTIME', value: 'node' }
        { name: 'APPINSIGHTS_INSTRUMENTATIONKEY', value: appInsights.properties.InstrumentationKey }
        { name: 'AZURE_STORAGE_CONNECTION_STRING', value: storageAccount.listKeys().keys[0].value }
      ]
    }
  }
}

// ── Outputs ───────────────────────────────────────────────
output staticWebAppUrl string = 'https://${staticWebApp.properties.defaultHostname}'
output staticWebAppName string = staticWebApp.name
output funcAppUrl string = 'https://${funcApp.properties.defaultHostName}'
output storageAccountName string = storageAccount.name
output appInsightsKey string = appInsights.properties.InstrumentationKey
