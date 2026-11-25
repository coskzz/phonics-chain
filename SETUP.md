# Phonics Chain - セットアップ手順

## 1. Firebase プロジェクト作成

1. https://console.firebase.google.com/ にアクセス
2. 「プロジェクトを追加」→ プロジェクト名: `phonics-chain`（任意）
3. Google Analytics はオフでOK → 「プロジェクトを作成」

## 2. Authentication 設定

1. 左メニュー「Authentication」→「始める」
2. 「Sign-in method」タブ → 「メール／パスワード」を有効化
3. 保存

## 3. Firestore Database 作成

1. 左メニュー「Firestore Database」→「データベースを作成」
2. ロケーション: `asia-northeast1`（東京）
3. 「テストモードで開始」→ 作成
4. 作成後「ルール」タブで `firestore.rules` の内容を貼り付けて「公開」
5. 「インデックス」タブ → 複合インデックスを以下の通り追加（自動で作成される場合もある）:
   - users: role ASC + weekScore DESC
   - users: role ASC + highScore DESC
   - users: role ASC + nickname ASC

## 4. Webアプリ登録 & firebase-config.js 更新

1. プロジェクト設定（歯車アイコン）→「全般」
2. 「アプリを追加」→ ウェブ（`</>`アイコン）
3. アプリのニックネーム: `phonics-chain-web`
4. 表示された `firebaseConfig` を `firebase-config.js` にコピー

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

5. コミット & プッシュ:
```bash
cd ~/phonics-chain
git add firebase-config.js
git commit -m "Add Firebase config"
git push
```

## 5. 初期教師アカウント作成

ブラウザで https://coskzz.github.io/phonics-chain/ を開き:

1. 「新規登録」で最初のアカウントを作る（任意のID/パスワード）
2. Firebase Console → Firestore → `users` コレクション → 作ったユーザーのドキュメント
3. `role` フィールドを `student` → `teacher` に変更
4. ページをリロードすると管理画面が表示される

以降は管理画面から教師アカウントを追加できる。

## 6. 校舎の追加

管理画面の「校舎管理」タブから校舎を追加する。
