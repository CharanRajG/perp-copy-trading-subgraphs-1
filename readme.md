
# subgraph

- Go  to https://api.studio.thegraph.com/query/44834/vault-factory1/v0.0.9

- And paste the below schema and click run.

```
{
  vaults(
        where : {
        status :"open"
        }, 
        orderBy : timestamp, 
        orderDirection : desc
    ) {
      id
      blockNumber
      timestamp
      txhash
      creator
      name
      proxy
      implementation
  }
}
```
