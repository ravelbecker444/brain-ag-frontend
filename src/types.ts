export interface Producer {
  id: number;
  documentNumber: string;
  producerName: string;
  farms?: Farm[]; 
  createdAt?: string;
  updatedAt?: string;
}
  
  export interface ApiResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }

  export interface Farm {
    id: number;
    farmName: string;
    city: string;
    state: string;
    totalAreaHectares: number;
    arableAreaHectares: number;
    vegetationAreaHectares: number;
    crops?: Crop[];
    producer: Producer;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Crop {
    id: number;
    name: string;
    harvest: string;
    plantedAreaHectares: number;
    farm: Farm;
    createdAt?: string;
    updatedAt?: string;
  }