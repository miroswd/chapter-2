import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "abc-1234",
      fine_amount: 60,
      category_id: "Name Car",
      brand: "brand",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "abc-1234",
        fine_amount: 60,
        category_id: "Name Car",
        brand: "brand",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "abc-1234",
        fine_amount: 60,
        category_id: "Name Car",
        brand: "brand",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "abc-1234",
      fine_amount: 60,
      category_id: "Name Car",
      brand: "brand",
    });

    expect(car.available).toBe(true);
  });
});
