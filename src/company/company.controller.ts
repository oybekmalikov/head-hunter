import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { AccessControlGuard } from "../common/guards/access-control.guard";
import { accessMatrix } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiTags("Company")
@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({
    summary: "Get company by name",
    description: "This endpoint retrieves a company by its name.",
  })
  @ApiResponse({ status: 200, description: "Get company by name" })
  @UseGuards(new AccessControlGuard(accessMatrix, "companies"))
  @UseGuards(AuthGuard)
  @Get("name/:name")
  getCompanyByName(@Param("name") name: string) {
    return this.companyService.getCompanyByName(name);
  }

  @ApiOperation({
    summary: "Create new company",
    description: "This endpoint allows you to create a new company.",
  })
  @ApiResponse({ status: 201, description: "Create new company" })
  @UseGuards(new AccessControlGuard(accessMatrix, "companies"))
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @ApiOperation({
    summary: "Get all compamnies",
    description: "This endpoint retrieves all companies.",
  })
  @ApiResponse({ status: 200, description: "List of compnaies" })
  @UseGuards(new AccessControlGuard(accessMatrix, "companies"))
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @ApiOperation({
    summary: "Get Companies by id",
    description: "This endpoint retrieves a company by its ID.",
  })
  @ApiResponse({ status: 200, description: "Get companies by id" })
  @UseGuards(new AccessControlGuard(accessMatrix, "companies"))
  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.companyService.findOne(+id);
  }

  @ApiOperation({
    summary: "Edit Company",
    description: "This endpoint allows you to update a company by its ID.",
  })
  @ApiResponse({ status: 200, description: "Company updated" })
  @UseGuards(new AccessControlGuard(accessMatrix, "companies"))
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @ApiOperation({
    summary: "Delete company",
    description: "This endpoint allows you to delete a company by its ID.",
  })
  @ApiResponse({ status: 200, description: "Company deleted" })
  @UseGuards(new AccessControlGuard(accessMatrix, "companies"))
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companyService.remove(+id);
  }
}
