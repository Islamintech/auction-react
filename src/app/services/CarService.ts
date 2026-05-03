import api from "../../lib/api";
import { AuctionCar } from "../../lib/types/landing";

class CarService {
  public async getAll(params?: { page?: number; limit?: number; order?: string }): Promise<AuctionCar[]> {
    try {
      const result = await api.get("/car/all", { params });
      return result.data;
    } catch (err) {
      console.log("Error, CarService.getAll:", err);
      throw err;
    }
  }

  public async getById(id: string): Promise<AuctionCar> {
    try {
      const result = await api.get(`/car/${id}`);
      return result.data;
    } catch (err) {
      console.log("Error, CarService.getById:", err);
      throw err;
    }
  }

  public async like(id: string): Promise<AuctionCar> {
    try {
      const result = await api.post(`/car/${id}/like`);
      return result.data;
    } catch (err) {
      console.log("Error, CarService.like:", err);
      throw err;
    }
  }

  public async comment(id: string, commentContent: string): Promise<AuctionCar> {
    try {
      const result = await api.post(`/car/${id}/comment`, { commentContent });
      return result.data;
    } catch (err) {
      console.log("Error, CarService.comment:", err);
      throw err;
    }
  }
}

export default CarService;
