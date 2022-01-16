## New templated project repo kick off step

### (hint) precondition

- client id of Jstorage (ask BE partner for it)
- (social signin) google/facebook clientId/secret (for BE partner)

### create new repo

1. go to revtel/gatsby-starter repo and click the `Use this template` button for creating the new project repo
2. go on the creating repo steps
3. clone the new repo to our local device

### link to starter step

1. add the remote of starter
```
git remote add upstream [https://github.com/revtel/gatsby-starter](https://github.com/revtel/gatsby-starter)
```
2. fetch starter's branches and commits 
```
git fetch --all
```
3. check if we done as expected
```
git remote -v
```
4. make the common commit!
```
git merge -X theirs upstream/main --allow-unrelated-histories
```

Then we got the new project repo with linking to the starter 👏🏻
Please sync the project with starter periodically for maintainance.
