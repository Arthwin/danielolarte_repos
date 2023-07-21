import { Response } from "express";
import Organization from "../../src/models/Organization";
import Tribe from "../../src/models/Tribe";
import Repository from "../../src/models/Repository";
import { getMetricsByTribeId } from "../../src/controllers/metrics";

// Helper function to create a mock response object
const createMockResponse = () => {
  const res = {} as Response;
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

// Mock the callMockVerificationApi function
jest.mock("../../src/middleware/mockVerificationApi.ts", () => ({
  callMockVerificationApi: jest.fn().mockResolvedValue({
    repositories: [
      {
        id: 1,
        status: 604,
      },
    ],
  }),
}));

describe("getMetricsByTribeId", () => {
  beforeEach(() => {
    // Clear any mocks and reset the database before each test if necessary
    jest.clearAllMocks();
    // You may need to reset your database here (if your Sequelize models are connected to a database)
  });

  it("should return metrics for valid TribeId", async () => {
    // Make a mock Express request and response objects
    const res = createMockResponse();
    const req: any = { params: { tribeId: 1 } };

    // Mock the necessary Sequelize functions
    Organization.findByPk = jest.fn().mockResolvedValue({
      id_organization: 1,
      name: "SomeOrganization",
      status: 1,
    });

    Tribe.findByPk = jest.fn().mockResolvedValue({
      id_tribe: 1,
      id_organization: 1,
      name: "SomeTribe",
      status: 1,
    });

    Repository.findAll = jest.fn().mockResolvedValue([
      {
        id_repository: 1,
        id_tribe: 1,
        name: "Repo1",
        state: "E",
        create_time: "2023-04-21 00:00:00",
        status: "A",
        metric: {
          id_repository: 1,
          coverage: 0.8,
          code_smells: 10,
          bugs: 5,
          vulnerabilities: 2,
          hotspot: 3,
        },
      },
    ]);

    // Call the controller function
    await getMetricsByTribeId(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      repositories: [
        {
          id: 1,
          name: "Repo1",
          tribe: "SomeTribe",
          organization: "SomeOrganization",
          coverage: "80%",
          codeSmells: 10,
          bugs: 5,
          vulnerabilities: 2,
          hotspots: 3,
          verificationState: "En espera",
          state: "Habilitado",
        },
      ],
    });
  });

  it("should return an error if the tribe doesn't exist", async () => {
    // Make a mock Express request and response objects
    const res = createMockResponse();
    const req: any = { params: { tribeId: 2 } };

    // Mock the necessary Sequelize functions

    Tribe.findByPk = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await getMetricsByTribeId(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      msg: "La Tribu no se encuentra registrada",
    });
  });

  it("should return a tag in the response indicating in natural language what the verification state of the repo is", async () => {
    // Make a mock Express request and response objects
    const res = createMockResponse();
    const req: any = { params: { tribeId: 1 } };

    // Mock the necessary Sequelize functions
    Organization.findByPk = jest.fn().mockResolvedValue({
      id_organization: 1,
      name: "SomeOrganization",
      status: 1,
    });

    Tribe.findByPk = jest.fn().mockResolvedValue({
      id_tribe: 1,
      id_organization: 1,
      name: "SomeTribe",
      status: 1,
    });

    Repository.findAll = jest.fn().mockResolvedValue([
      {
        id_repository: 1,
        id_tribe: 1,
        name: "Repo1",
        state: "E",
        create_time: "2023-04-21 00:00:00",
        status: "A",
        metric: {
          id_repository: 1,
          coverage: 0.8,
          code_smells: 10,
          bugs: 5,
          vulnerabilities: 2,
          hotspot: 3,
        },
      },
    ]);

    // Call the controller function
    await getMetricsByTribeId(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      repositories: [
        expect.objectContaining({
          verificationState: "En espera",
        }),
      ],
    });
  });

  it("should return an error if the tribe has no repositories that have the necessary coverage", async () => {
    // Make a mock Express request and response objects
    const res = createMockResponse();
    const req: any = { params: { tribeId: 3 } };

    // Mock the necessary Sequelize functions
    Organization.findByPk = jest.fn().mockResolvedValue({
      id_organization: 2,
      name: "SomeOrganization2",
      status: 1,
    });

    Tribe.findByPk = jest.fn().mockResolvedValue({
      id_tribe: 3,
      id_organization: 2,
      name: "SomeTribe2",
      status: 1,
    });

    Repository.findAll = jest.fn().mockResolvedValue([]);

    // Call the controller function
    await getMetricsByTribeId(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      msg: "La Tribu no tiene repositorios que cumplan con la cobertura necesaria",
    });
  });
});
