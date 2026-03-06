export interface BmiResult {
  bmi: number;
  category: string;
  color: string;
}

export function calculateBmi(weightKg: number, heightCm: number): BmiResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: string;
  let color: string;

  if (bmi < 18.5) {
    category = "Underweight";
    color = "text-blue-600";
  } else if (bmi < 25) {
    category = "Normal weight";
    color = "text-green-600";
  } else if (bmi < 30) {
    category = "Overweight";
    color = "text-yellow-600";
  } else {
    category = "Obese";
    color = "text-red-600";
  }

  return { bmi, category, color };
}

export function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

export function ftInToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}
