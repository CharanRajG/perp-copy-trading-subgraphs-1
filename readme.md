
# subgraph

- Go  to https://api.studio.thegraph.com/query/44834/vault-factory1/v0.1.0

- And paste the below schema and click run.

```
{
  vaults(
    orderBy: timestamp,
    orderDirection: desc
  ) {
    id
    blockNumber
    timestamp
    txhash
    creator
    name
    proxy
    implementation
    status
  }
  
  traderDatas(orderBy : timestamp, orderDirection : desc){
    id
    vault
    trader
    txhash
    timestamp
    copySizeBPS
    blockNumber
    inverseCopyTrade
    defaultCollateral
  }
}
```
