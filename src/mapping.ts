import { Address, BigInt } from "@graphprotocol/graph-ts";
import { CreateVault, DeleteVault } from "../generated/VaultFactory/VaultFactory";
import { Vault } from "../generated/schema";

export function handleCreateVault(event: CreateVault): void {
  let vault = new Vault(event.params.vaultProxy.toHex());
  vault.creator = event.params.creator;
  vault.name = event.params.name.toString();
  vault.implementation = event.params.vaultImplementation;
  vault.proxy = event.params.vaultProxy;
  vault.status = "open";
  vault.save();
}

export function handleDeleteVault(event: DeleteVault): void {
  let vault = Vault.load(event.params.vaultProxy.toHex());
  if (vault != null) {
    vault.status = "closed";
    vault.save();
  }
}