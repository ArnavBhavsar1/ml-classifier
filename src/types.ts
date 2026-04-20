export interface IrisData {
  sepalLength: number;
  sepalWidth: number;
  petalLength: number;
  petalWidth: number;
  species: 'setosa' | 'versicolor' | 'virginica';
}

export type Species = IrisData['species'];

export const SPECIES_COLORS = {
  setosa: '#f43f5e', // Rose 500
  versicolor: '#06b6d4', // Cyan 500
  virginica: '#8b5cf6', // Violet 500
};
