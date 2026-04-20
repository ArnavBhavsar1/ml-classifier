import KNN from 'ml-knn';
import { IRIS_DATASET } from '../data/iris';
import { IrisData, Species } from '../types';

const SPECIES_MAP: Record<Species, number> = {
  setosa: 0,
  versicolor: 1,
  virginica: 2,
};

const REVERSE_SPECIES_MAP: Record<number, Species> = {
  0: 'setosa',
  1: 'versicolor',
  2: 'virginica',
};

export class IrisClassifier {
  private knn: KNN | null = null;
  private kValue: number = 3;

  constructor(k: number = 3) {
    this.kValue = k;
  }

  public train(data: IrisData[] = IRIS_DATASET) {
    const X = data.map((d) => [
      d.sepalLength,
      d.sepalWidth,
      d.petalLength,
      d.petalWidth,
    ]);
    const y = data.map((d) => SPECIES_MAP[d.species]);

    this.knn = new KNN(X, y, { k: this.kValue });
  }

  public predict(input: number[]): Species {
    if (!this.knn) {
      this.train();
    }
    const prediction = this.knn!.predict([input])[0];
    return REVERSE_SPECIES_MAP[prediction as number];
  }

  public setK(k: number) {
    this.kValue = k;
    this.train();
  }
}

export const classifier = new IrisClassifier();
