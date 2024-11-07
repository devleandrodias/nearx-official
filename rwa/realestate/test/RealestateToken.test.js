const { expect } = require("chai");
const { ethers } = require("hardhat");
const { beforeEach } = require("mocha");

describe("RealestateToken", function () {
  let ImovelToken, imovelToken, moeda, owner, comprador, locatario;

  beforeEach(async function () {
    [owner, comprador, locatario] = await ethers.getSigners();

    console.log(owner.address);
    console.log(comprador.address);
    console.log(locatario.address);

    // Deploy do token ERC20
    const ERC20 = await ethers.getContractFactory("RealDigital");
    const moeda = await ERC20.deploy();

    // console.log(owner.address);
    moeda.mint(owner.address, ethers.parseEther("200"));

    // Deploy do contrato inteligente
    imovelToken = await ethers.getContractFactory("ImovelToken");
    imovelToken = await ImovelToken.deploy(moeda.target);

    // Enviar moeda para comprador e locatario
    await moeda.transfer(comprador.address, ethers.parseEther("100"));
    await moeda.transfer(locatario.address, ethers.parseEther("100"));
  });

  it("Deveria listar um imóvel", async function () {
    await imovelToken
      .connect(owner)
      .listarImovel("uri", ethers.parseEther("10"));

    expect(await imovelToken.tokenURI(1)).to.equal("uri");
    expect(await imovelToken.precos(1)).to.equal(ethers.parseEther("10"));
  });

  it("Deveria comprar um imóvel", async function () {
    await imovelToken
      .connect(owner)
      .listarImovel("uri", ethers.parseEther("10"));

    await moeda
      .connect(comprador)
      .approve(imovelToken.target, ethers.parseEther("10"));

    await imovelToken.connect(comprador).comprarImovel(1);

    expect(await imovelToken.ownerOf(1)).to.equal(comprador.address);
  });

  it("Deveria alugar um imóvel", async function () {
    await imovelToken
      .connect(owner)
      .listarImovel("uri", ethers.parseEther("10"));
    await moeda
      .connect(locatario)
      .alugarImovel(imovelToken.target, ethers.parseEther("1"));
    await imovelToken.connect(locatario).alugarImovel(1, 10);
    expect(await imovelToken.locatarios(1)).to.equal(locatario.address);
  });

  it("Deveria finalizar o aluguel de um imóvel", async function () {
    await imovelToken
      .connect(owner)
      .listarImovel("uri", ethers.parseEther("10"));

    await moeda
      .connect(locatario)
      .alugarImovel(imovelToken.target, ethers.parseEther("1"));

    await imovelToken.connect(locatario).alugarImovel(1, 10);
    await imovelToken.connect(locatario).finalizarAluguel(1);

    expect(await imovelToken.locatarios(1)).to.equal(ethers.ZeroAddress);
  });
});
