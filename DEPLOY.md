# 公開手順（Phase 4：新規GitHubアカウント＋GitHub Pages）

このアプリを **新しい個人用GitHubアカウント** で無料公開し、iPhoneのホーム画面に追加するまでの手順です。
ターミナルは使わず、**ブラウザのドラッグ&ドロップだけ**で完了できます。

> 公開されるのは「アプリのコード（index.html など）」と「sample.csv」だけです。
> あなたが実際に学習で読み込むCSVは**端末内（ブラウザ）にのみ保存**され、リポジトリには上がりません。

---

## STEP 1. 新しいGitHubアカウントを作る

1. ブラウザのシークレットウィンドウ（学術アカウントとログインが混ざらないように）で https://github.com を開く
2. **学術用とは別のメールアドレス**でサインアップ
3. プランは **Free（無料）** でOK（公開リポジトリ＋Pagesは無料）

---

## STEP 2. リポジトリを作る

1. 右上の「＋」→ **New repository**
2. **Repository name**：`quiz`（任意。これが公開URLの一部になります）
3. 公開範囲：**Public** を選択
   - 無料でPagesを使うにはPublicが必要です。コードは公開されますが、機密情報は含みません
4. 下の方の初期化オプションはチェック不要。**Create repository**

---

## STEP 3. ファイルをアップロードする

1. リポジトリ画面の **Add file → Upload files**
2. `quiz-app` フォルダを開き、**中のファイルをすべて選択**してドラッグ&ドロップ
   （このアプリはフォルダ（`lib/` や `icons/`）を使わない**フラット構成**なので、
   　全部ファイルのまま＝サブフォルダ無しでアップロードできます）
   - `index.html` / `manifest.json` / `sw.js` / `.nojekyll`
   - `papaparse.min.js` / `xlsx.full.min.js`（解析ライブラリ）
   - `icon-192.png` / `icon-512.png` / `apple-touch-icon.png`（アイコン）
   - `sample.csv` / `README.md` / `DEPLOY.md`
   - ※`.nojekyll` はFinderで隠れて見えないことがあります。見当たらなければ STEP 6 を参照
3. 下の **Commit changes** を押す

---

## STEP 4. GitHub Pages を有効化する

1. リポジトリの **Settings** → 左メニュー **Pages**
2. **Build and deployment** の Source を **Deploy from a branch**
3. Branch を **main** / **/(root)** にして **Save**
4. 1分ほど待つと、上部に **「Your site is live at https://<ユーザー名>.github.io/quiz/」** と表示されます

---

## STEP 5. 動作確認（PC）

- そのURLをブラウザで開く（GitHub Pages は https なので、PWA／オフライン機能が有効になります）
- CSVを追加 → 出題できれば成功

---

## STEP 6. iPhoneでホーム画面に追加

1. iPhoneの **Safari**（Chromeではなく）で、上記の https URL を開く
2. 共有ボタン（□に↑）→ **ホーム画面に追加**
3. 追加されたアイコンから起動すると、アドレスバーの無い**全画面のアプリ風**で動きます
4. 一度オンラインで開いていれば、以後は**オフラインでも起動**します

---

## STEP 7. あとで内容を更新するとき

1. **STEP 3 と同じ手順で、変更したファイルを再アップロード（上書き）**
2. ★**重要**：`index.html` や `lib/` を変えたら、`sw.js` の
   `const CACHE = "quiz-app-vN";` の **番号を必ず上げる**（例：`v2` → `v3`）
   - これをしないと、古いキャッシュが残って画面が更新されません

---

## 補足

- **`.nojekyll` とは**：GitHub Pages は既定で「Jekyll」という仕組みが動きます。
  このアプリは無くても動きますが、念のため Jekyll の処理を止める空ファイルを同梱しています。
  もしアップロードし損ねたら、リポジトリで **Add file → Create new file → 名前を `.nojekyll`
  にして空のまま Commit** すれば作れます。
- **ターミナル（git）で更新したい場合**：可能ですが、新アカウント用の認証
  （HTTPSなら Personal Access Token、SSHなら新しい鍵）が要り、既存の学術アカウントの
  認証と混ざらないよう注意が必要です。手間を避けるなら、上記のWebアップロードのままで十分です。
- **独自ドメインや非公開化は不要**：URLを知っている人しか開きませんし、内容はクイズのみです。
  どうしてもURLを知られたくない場合は、リポジトリ名を推測しにくいものにする手もあります。
