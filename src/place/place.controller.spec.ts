import { Test, TestingModule } from "@nestjs/testing";
import { PlaceController } from "./place.controller";
import { PlaceService } from "./place.service";
import { CloudinaryService } from "./cloudinary.service";
import { Place, placeType } from "@prisma/client";

describe("PlaceController testes", () => {
    let controller: PlaceController;
    let placeService: jest.Mocked<PlaceService>;
    let cloudinaryService: jest.Mocked<CloudinaryService>

    beforeEach(async () => {
        const mockPlaceService = {
            findAll: jest.fn(),
            findPaginated: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()
        } as any

        const mockCloudinaryService = {
            uploadImagen: jest.fn(),
            deleteImagen: jest.fn()
        } as any

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlaceController],
            providers: [
                {provide: PlaceService, useValue: mockPlaceService},
                {provide: CloudinaryService, useValue: mockCloudinaryService}
            ]
        }).compile()

        controller = module.get<PlaceController>(PlaceController);
        placeService = module.get(PlaceService);
        cloudinaryService = module.get(CloudinaryService);
    })

    it("deve listar todos os locais", async () => {
        const places: Place[] = [
            {
                id: "550e8400-e29b-41d4-a716-446655440000", 
                name: "Baron",
                type: placeType.RESTAURANTE,
                phone: "(88) 4002-8922",
                latitude: -12344,
                longitude: 12345,
                images: ["https://www.google.com/search?sca_esv=bbe24cb31649d4ed&sxsrf=AE3TifNDd3PMQP1hFk3TOUNoJUmT2Bfp8g:1755190839685&udm=2&fbs=AIIjpHxX5k-tONtMCu8aDeA7E5WMlVZjGnBiGIxaghLPqA-PlfgbLKUxiHcJwD8uXnH2piRJ050j0vn26_9l7bhJ4n7QPV-WlaFzA5vaGqRErzXXl-hAEqPG1IUtttCfgvMJG_hYbXMb50KemBeGNQv-kk32JWlgMuElh7afUv4sICSVekLQVK0WB9teW6hWMHsi2elsmORn0k6aiXY6EUk0BTALmUPKBw&q=lanchonete&sa=X&ved=2ahUKEwjcwoy044qPAxU-qJUCHUAXCAAQtKgLegQIGhAB&biw=1707&bih=862&dpr=1.13#vhid=KKNQTIWQgp1-4M&vssid=mosaic"],
                created_at: new Date("2023-01-01")
            },

            {
                id: "550e8400-e29b-41d4-a716-440987678988", 
                name: "Luar do Sertão",
                type: placeType.HOTEL,
                phone: "(88) 4002-7878",
                latitude: -45679876,
                longitude: 3456788,
                images: ["https://www.google.com/search?sca_esv=bbe24cb31649d4ed&sxsrf=AE3TifNDd3PMQP1hFk3TOUNoJUmT2Bfp8g:1755190839685&udm=2&fbs=AIIjpHxX5k-tONtMCu8aDeA7E5WMlVZjGnBiGIxaghLPqA-PlfgbLKUxiHcJwD8uXnH2piRJ050j0vn26_9l7bhJ4n7QPV-WlaFzA5vaGqRErzXXl-hAEqPG1IUtttCfgvMJG_hYbXMb50KemBeGNQv-kk32JWlgMuElh7afUv4sICSVekLQVK0WB9teW6hWMHsi2elsmORn0k6aiXY6EUk0BTALmUPKBw&q=lanchonete&sa=X&ved=2ahUKEwjcwoy044qPAxU-qJUCHUAXCAAQtKgLegQIGhAB&biw=1707&bih=862&dpr=1.13#vhid=KKNQTIWQgp1-4M&vssid=mosaic"],
                created_at: new Date("2023-01-01")
            }
        ]

        placeService.findAll.mockResolvedValue(places)

        expect(await controller.findAll()).toEqual(places)
    })

    it("deve listar locais paginados", async () => {
        const limit = 10
        const page = 1
        const result = {
            data: [
            {
                id: "550e8400-e29b-41d4-a716-446655440000", 
                name: "Baron",
                type: placeType.RESTAURANTE,
                phone: "(88) 4002-8922",
                latitude: -12344,
                longitude: 12345,
                images: ["https://www.google.com/search?sca_esv=bbe24cb31649d4ed&sxsrf=AE3TifNDd3PMQP1hFk3TOUNoJUmT2Bfp8g:1755190839685&udm=2&fbs=AIIjpHxX5k-tONtMCu8aDeA7E5WMlVZjGnBiGIxaghLPqA-PlfgbLKUxiHcJwD8uXnH2piRJ050j0vn26_9l7bhJ4n7QPV-WlaFzA5vaGqRErzXXl-hAEqPG1IUtttCfgvMJG_hYbXMb50KemBeGNQv-kk32JWlgMuElh7afUv4sICSVekLQVK0WB9teW6hWMHsi2elsmORn0k6aiXY6EUk0BTALmUPKBw&q=lanchonete&sa=X&ved=2ahUKEwjcwoy044qPAxU-qJUCHUAXCAAQtKgLegQIGhAB&biw=1707&bih=862&dpr=1.13#vhid=KKNQTIWQgp1-4M&vssid=mosaic"],
                created_at: new Date("2023-01-01")
            },

            {
                id: "550e8400-e29b-41d4-a716-440987678988", 
                name: "Luar do Sertão",
                type: placeType.HOTEL,
                phone: "(88) 4002-7878",
                latitude: -45679876,
                longitude: 3456788,
                images: ["https://www.google.com/search?sca_esv=bbe24cb31649d4ed&sxsrf=AE3TifNDd3PMQP1hFk3TOUNoJUmT2Bfp8g:1755190839685&udm=2&fbs=AIIjpHxX5k-tONtMCu8aDeA7E5WMlVZjGnBiGIxaghLPqA-PlfgbLKUxiHcJwD8uXnH2piRJ050j0vn26_9l7bhJ4n7QPV-WlaFzA5vaGqRErzXXl-hAEqPG1IUtttCfgvMJG_hYbXMb50KemBeGNQv-kk32JWlgMuElh7afUv4sICSVekLQVK0WB9teW6hWMHsi2elsmORn0k6aiXY6EUk0BTALmUPKBw&q=lanchonete&sa=X&ved=2ahUKEwjcwoy044qPAxU-qJUCHUAXCAAQtKgLegQIGhAB&biw=1707&bih=862&dpr=1.13#vhid=KKNQTIWQgp1-4M&vssid=mosaic"],
                created_at: new Date("2023-01-01")
            }
        ],
        meta: {
        total: 2,
        page: 1,
        lastPage: 1
        }
        }

        placeService.findPaginated.mockResolvedValue(result);

        expect(await controller.findPaginated(page, limit)).toBe(result);
        expect(placeService.findPaginated).toHaveBeenCalledWith(page, limit);

    })

})