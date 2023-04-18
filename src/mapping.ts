import { Address, BigInt } from "@graphprotocol/graph-ts";
import { CreateVault, DeleteVault, Trader } from "../generated/VaultFactory/VaultFactory";
import { Vault, TraderData } from "../generated/schema";

export function handleCreateVault(event: CreateVault): void {
  let vault = new Vault(event.params.vaultProxy.toHex());
  vault.creator = event.params.creator.toHex();
  vault.name = event.params.name.toString();
  vault.implementation = event.params.vaultImplementation.toHex();
  vault.proxy = event.params.vaultProxy.toHex();
  vault.status = "open";
  vault.blockNumber = event.block.number.toI32();
  vault.txhash = event.transaction.hash.toHex();
  vault.timestamp = event.block.timestamp.toI32();
  vault.save();
}

export function handleDeleteVault(event: DeleteVault): void {
  let vault = Vault.load(event.params.vaultProxy.toHex());
  if (vault != null) {
    vault.status = "closed";
    vault.timestamp = event.block.timestamp.toI32();
    vault.blockNumber = event.block.number.toI32();
    vault.txhash = event.transaction.hash.toHex();
    vault.save();
  }
}


export function handleTrader(event: Trader): void {
  let traderId = event.params.vault.toHex() + "-" + event.params.trader.toHex();
  let trader = TraderData.load(traderId);

  if (trader == null) {
    trader = new TraderData(traderId);
    trader.vault = event.params.vault.toHex();
    trader.trader = event.params.trader.toHex();
  }

  trader.blockNumber = event.block.number.toI32();
  trader.txhash = event.transaction.hash.toHex();
  trader.timestamp = event.block.timestamp.toI32();
  trader.inverseCopyTrade = event.params.inverseCopyTrade;
  trader.copySizeBPS = event.params.copySizeBPS;
  trader.defaultCollateral = event.params.defaultCollateral.toHex();

  trader.save();
}


// {
//   vaults(
//     where : {
//       status :"open"
//     }, 
//     orderBy : timestamp, 
//     orderDirection : desc) {
//       id
//       blockNumber
//       timestamp
//       txhash
//       creator
//       name
//       proxy
//       implementation
//   }
// }

// https://api.studio.thegraph.com/query/44834/vault-factory1/v0.0.3