BASE_REPO="https://github.com/revtel/gatsby-starter"
BASE_REPO_BRANCH="main"

function link_template_repo {
  git remote add template $BASE_REPO
  git fetch --all
  git merge template/$BASE_REPO_BRANCH --allow-unrelated-histories
}

link_template_repo
