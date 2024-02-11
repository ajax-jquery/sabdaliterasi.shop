name: Publish Blog Drafts

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Jekyll Publish Drafts
      uses: soywiz/github-action-jekyll-publish-drafts@v2
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        jekyll_path: ./
        branch: master
