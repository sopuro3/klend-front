# GET

## NormStockTable

取得するデータ：
Equipments (GET /equipment)

## ManageStockTable

取得するデータ：
Equipments (GET /equipment)

## SelectableStockTable.tsx

取得するデータ：
idはpropsに入ってるからそれで解決できる
ただし、初期調査の場合はGET /Equipmentを使うのでidは不要。めんどくさいので""を渡した

70行目 Equipments (GET /equipment)

113行目 GET /form/:id

## /determine_lend_select/index.tsx

25行目 GET /form/:id

## Issue_Page.tsx

取得するデータ： GET /form/:id

## Issue.tsx

取得するデータ： GET /form/:id

## IssueTable.tsx

取得するデータ： GET /form

# POST

## /views/survey/index.tsx

116行目 POST /issue/survey
ちゃんとデータを送信し、DisplayIDを受け取ったかか確認した後で、displayIDをダイナミックルーティングで渡しつつdoneに移行する

## /views/determine_lend_select/index.tsx

50行目当たり
PATCH /issue/:issueID

## Print.tsx

63行目
PUT /issue/:issueID

## ManageStockTable.tsx

function POST()の中
PUT /equipment/:id
