import { parseSingleUnifiedDiff, splitDiffs } from '.'

describe('parseSingleUnifiedDiff', () => {
  test('add', () => {
    const diff = `--- a/package.json
+++ b/package.json
@@ -10,7 +10,12 @@
   "dependencies": {
     "@apollo/client": "^3.1.4",
     "@apollo/react-hooks": "^4.0.0",
+    "@fortawesome/fontawesome-svg-core": "^1.2.30",
+    "@fortawesome/free-brands-svg-icons": "^5.14.0",
+    "@fortawesome/free-solid-svg-icons": "^5.14.0",
+    "@fortawesome/react-fontawesome": "^0.1.11",
     "autosize": "^4.0.2",
+    "bootstrap-icons": "^1.0.0",
     "graphql": "^15.3.0",
     "minireset.css": "^0.0.6",
     "next": "9.5.2",
`
    expect(parseSingleUnifiedDiff(diff)).toEqual({
      diffLines: [
        {
          next: {
            content: '  "dependencies": {',
            lineNumber: 10,
          },
          prev: {
            content: '  "dependencies": {',
            lineNumber: 10,
          },
        },
        {
          next: {
            content: '    "@apollo/client": "^3.1.4",',
            lineNumber: 11,
          },
          prev: {
            content: '    "@apollo/client": "^3.1.4",',
            lineNumber: 11,
          },
        },
        {
          next: {
            content: '    "@apollo/react-hooks": "^4.0.0",',
            lineNumber: 12,
          },
          prev: {
            content: '    "@apollo/react-hooks": "^4.0.0",',
            lineNumber: 12,
          },
        },
        {
          next: {
            content: '    "@fortawesome/fontawesome-svg-core": "^1.2.30",',
            lineNumber: 13,
          },
        },
        {
          next: {
            content: '    "@fortawesome/free-brands-svg-icons": "^5.14.0",',
            lineNumber: 14,
          },
        },
        {
          next: {
            content: '    "@fortawesome/free-solid-svg-icons": "^5.14.0",',
            lineNumber: 15,
          },
        },
        {
          next: {
            content: '    "@fortawesome/react-fontawesome": "^0.1.11",',
            lineNumber: 16,
          },
        },
        {
          next: {
            content: '    "autosize": "^4.0.2",',
            lineNumber: 17,
          },
          prev: {
            content: '    "autosize": "^4.0.2",',
            lineNumber: 13,
          },
        },
        {
          next: {
            content: '    "bootstrap-icons": "^1.0.0",',
            lineNumber: 18,
          },
        },
        {
          next: {
            content: '    "graphql": "^15.3.0",',
            lineNumber: 19,
          },
          prev: {
            content: '    "graphql": "^15.3.0",',
            lineNumber: 14,
          },
        },
        {
          next: {
            content: '    "minireset.css": "^0.0.6",',
            lineNumber: 20,
          },
          prev: {
            content: '    "minireset.css": "^0.0.6",',
            lineNumber: 15,
          },
        },
        {
          next: {
            content: '    "next": "9.5.2",',
            lineNumber: 21,
          },
          prev: {
            content: '    "next": "9.5.2",',
            lineNumber: 16,
          },
        },
      ],
      nextFilename: 'package.json',
      prevFilename: 'package.json',
    })
  })

  test('', () => {
    const diff = `--- a/src/pages/[userId]/[articleId]/index.tsx
+++ b/src/pages/[userId]/[articleId]/index.tsx
@@ -32,12 +36,13 @@ const ArticleHeader: React.FC<ArticleHeaderProps> = ({
         </div>
         <div className={styles.userText}>
           <div className={styles.userId}>
-            {user.displayName} @{user.displayId}
+            {user.displayName} &nbsp;
+            <span className={styles.publishedAt}>
+              <span>{datetime}</span>
+              {isNew ? <span className={styles.newContent}>New</span> : ''}
+              <span> &nbsp;約4分で読めます</span>
+            </span>
           </div>
-          <span className={styles.publishedAt}>
-            <span>{datetime}</span>
-            {isNew ? <span className={styles.newContent}>New</span> : ''}
-          </span>
         </div>
       </div>
     </>
`
    expect(parseSingleUnifiedDiff(diff)).toEqual({
      diffLines: [
        {
          next: { content: '        </div>', lineNumber: 36 },
          prev: { content: '        </div>', lineNumber: 32 },
        },
        {
          next: {
            content: '        <div className={styles.userText}>',
            lineNumber: 37,
          },
          prev: {
            content: '        <div className={styles.userText}>',
            lineNumber: 33,
          },
        },
        {
          next: {
            content: '          <div className={styles.userId}>',
            lineNumber: 38,
          },
          prev: {
            content: '          <div className={styles.userId}>',
            lineNumber: 34,
          },
        },
        {
          prev: {
            content: '            {user.displayName} @{user.displayId}',
            lineNumber: 35,
          },
          next: {
            content: '            {user.displayName} &nbsp;',
            lineNumber: 39,
          },
        },
        {
          next: {
            content: '            <span className={styles.publishedAt}>',
            lineNumber: 40,
          },
        },
        {
          next: {
            content: '              <span>{datetime}</span>',
            lineNumber: 41,
          },
        },
        {
          next: {
            content:
              "              {isNew ? <span className={styles.newContent}>New</span> : ''}",
            lineNumber: 42,
          },
        },
        {
          next: {
            content: '              <span> &nbsp;約4分で読めます</span>',
            lineNumber: 43,
          },
        },
        { next: { content: '            </span>', lineNumber: 44 } },
        {
          next: { content: '          </div>', lineNumber: 45 },
          prev: { content: '          </div>', lineNumber: 36 },
        },
        {
          prev: {
            content: '          <span className={styles.publishedAt}>',
            lineNumber: 37,
          },
        },
        {
          prev: {
            content: '            <span>{datetime}</span>',
            lineNumber: 38,
          },
        },
        {
          prev: {
            content:
              "            {isNew ? <span className={styles.newContent}>New</span> : ''}",
            lineNumber: 39,
          },
        },
        { prev: { content: '          </span>', lineNumber: 40 } },
        {
          next: { content: '        </div>', lineNumber: 46 },
          prev: { content: '        </div>', lineNumber: 41 },
        },
        {
          next: { content: '      </div>', lineNumber: 47 },
          prev: { content: '      </div>', lineNumber: 42 },
        },
        {
          next: { content: '    </>', lineNumber: 48 },
          prev: { content: '    </>', lineNumber: 43 },
        },
      ],
      nextFilename: 'src/pages/[userId]/[articleId]/index.tsx',
      prevFilename: 'src/pages/[userId]/[articleId]/index.tsx',
    })
  })
})

test('splitDiffs', () => {
  const diff = `diff --git a/package.json b/package.json
index 87d6094..e2b7dd4 100644
--- a/package.json
+++ b/package.json
@@ -10,7 +10,12 @@
   "dependencies": {
     "@apollo/client": "^3.1.4",
     "@apollo/react-hooks": "^4.0.0",
+    "@fortawesome/fontawesome-svg-core": "^1.2.30",
+    "@fortawesome/free-brands-svg-icons": "^5.14.0",
+    "@fortawesome/free-solid-svg-icons": "^5.14.0",
+    "@fortawesome/react-fontawesome": "^0.1.11",
     "autosize": "^4.0.2",
+    "bootstrap-icons": "^1.0.0",
     "graphql": "^15.3.0",
     "minireset.css": "^0.0.6",
     "next": "9.5.2",
diff --git a/src/pages/[userId]/[articleId]/index.module.css b/src/pages/[userId]/[articleId]/index.module.css
index 0b65eca..c9dbe79 100644
--- a/src/pages/[userId]/[articleId]/index.module.css
+++ b/src/pages/[userId]/[articleId]/index.module.css
@@ -12,7 +12,7 @@
 }
 
 .userContainer {
-  margin-top: 32px;
+  margin-top: 16px;
   display: flex;
   align-items: center;
 }
@@ -43,3 +43,48 @@
   margin-left: 8px;
   color: #22c;
 }
+
+.twitterIcon {
+  color: #1da1f2;
+}
+
+.userRight {
+  margin-left: auto;
+}
+
+.icon + .icon {
+  margin-left: 16px;
+}
+
+.tag {
+  background-color: yellowgreen;
+  border-radius: 4px;
+  font-size: 14px;
+  padding: 4px;
+}
+
+.tag + .tag {
+  margin-left: 8px;
+}
+
+.articleFooter {
+  margin-top: 16px;
+  border-top: 1px solid #888;
+  border-bottom: 1px solid #888;
+  display: flex;
+  padding: 32px 0;
+}
+
+.userDescription {
+  font-size: 14px;
+}
+
+.articleFooterContainer {
+  margin: 32px 0;
+  display: flex;
+  align-items: center;
+}
+
+.tagContainer {
+  margin: 16px 0;
+}
diff --git a/src/pages/[userId]/[articleId]/index.tsx b/src/pages/[userId]/[articleId]/index.tsx
index ac1926a..f57e523 100644
--- a/src/pages/[userId]/[articleId]/index.tsx
+++ b/src/pages/[userId]/[articleId]/index.tsx
@@ -1,11 +1,15 @@
 import { useRouter } from 'next/router'
 import { NextPage } from 'next'
 import Error from 'next/error'
+import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
+import { faEllipsisH, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
+import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
 
 import { useGetArticleQuery, Users } from '@/generated/graphql'
 import { Article } from '@/components/article'
 import { SiteHeader } from '@/components/site-header'
 import { UserIcon } from '@/components/user-icon'
+import { Button } from '@/components/button'
 import { formatDate } from '@/utils/date'
 
 import styles from './index.module.css'
@@ -32,12 +36,13 @@ const ArticleHeader: React.FC<ArticleHeaderProps> = ({
         </div>
         <div className={styles.userText}>
           <div className={styles.userId}>
-            {user.displayName} @{user.displayId}
+            {user.displayName} &nbsp;
+            <span className={styles.publishedAt}>
+              <span>{datetime}</span>
+              {isNew ? <span className={styles.newContent}>New</span> : ''}
+              <span> &nbsp;約4分で読めます</span>
+            </span>
           </div>
-          <span className={styles.publishedAt}>
-            <span>{datetime}</span>
-            {isNew ? <span className={styles.newContent}>New</span> : ''}
-          </span>
         </div>
       </div>
     </>
@@ -79,6 +84,33 @@ const ArticlePage: NextPage = () => {
         <div className={styles.content}>
           <Article content={content} />
         </div>
+        <div className={styles.tagContainer}>
+          <span className={styles.tag}>#tag</span>
+          <span className={styles.tag}>#タグ</span>
+        </div>
+        <div className={styles.articleFooterContainer}>
+          <div>
+            <FontAwesomeIcon icon={faThumbsUp} className={styles.icon} />
+            &nbsp; 65536イイネ！
+          </div>
+          <div className={styles.userRight}>
+            <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
+            <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
+            <FontAwesomeIcon icon={faEllipsisH} className={styles.icon} />
+          </div>
+        </div>
+        <div className={styles.articleFooter}>
+          <UserIcon src="/profile.png" />
+          <div className={styles.userText}>
+            <div>{user.displayName}</div>
+            <p className={styles.userDescription}>
+              ほげほげでふがふがをやっています。
+            </p>
+          </div>
+          <div className={styles.userRight}>
+            <Button>Follow</Button>
+          </div>
+        </div>
       </div>
     </>
   )
diff --git a/yarn.lock b/yarn.lock
index 2e4b18a..db68876 100644
--- a/yarn.lock
+++ b/yarn.lock
@@ -1147,6 +1147,39 @@
     exec-sh "^0.3.2"
     minimist "^1.2.0"
 
+"@fortawesome/fontawesome-common-types@^0.2.30":
+  version "0.2.30"
+  resolved "https://registry.yarnpkg.com/@fortawesome/fontawesome-common-types/-/fontawesome-common-types-0.2.30.tgz#2f1cc5b46bd76723be41d0013a8450c9ba92b777"
+  integrity sha512-TsRwpTuKwFNiPhk1UfKgw7zNPeV5RhNp2Uw3pws+9gDAkPGKrtjR1y2lI3SYn7+YzyfuNknflpBA1LRKjt7hMg==
+
+"@fortawesome/fontawesome-svg-core@^1.2.30":
+  version "1.2.30"
+  resolved "https://registry.yarnpkg.com/@fortawesome/fontawesome-svg-core/-/fontawesome-svg-core-1.2.30.tgz#f56dc6791861fe5d1af04fb8abddb94658c576db"
+  integrity sha512-E3sAXATKCSVnT17HYmZjjbcmwihrNOCkoU7dVMlasrcwiJAHxSKeZ+4WN5O+ElgO/FaYgJmASl8p9N7/B/RttA==
+  dependencies:
+    "@fortawesome/fontawesome-common-types" "^0.2.30"
+
+"@fortawesome/free-brands-svg-icons@^5.14.0":
+  version "5.14.0"
+  resolved "https://registry.yarnpkg.com/@fortawesome/free-brands-svg-icons/-/free-brands-svg-icons-5.14.0.tgz#98555518ba41bdff82fbae2f4d1bc36cd3b1c043"
+  integrity sha512-WsqPFTvJFI7MYkcy0jeFE2zY+blC4OrnB9MJOcn1NxRXT/sSfEEhrI7CwzIkiYajLiVDBKWeErYOvpsMeodmCQ==
+  dependencies:
+    "@fortawesome/fontawesome-common-types" "^0.2.30"
+
+"@fortawesome/free-solid-svg-icons@^5.14.0":
+  version "5.14.0"
+  resolved "https://registry.yarnpkg.com/@fortawesome/free-solid-svg-icons/-/free-solid-svg-icons-5.14.0.tgz#970453f5e8c4915ad57856c3a0252ac63f6fec18"
+  integrity sha512-M933RDM8cecaKMWDSk3FRYdnzWGW7kBBlGNGfvqLVwcwhUPNj9gcw+xZMrqBdRqxnSXdl3zWzTCNNGEtFUq67Q==
+  dependencies:
+    "@fortawesome/fontawesome-common-types" "^0.2.30"
+
+"@fortawesome/react-fontawesome@^0.1.11":
+  version "0.1.11"
+  resolved "https://registry.yarnpkg.com/@fortawesome/react-fontawesome/-/react-fontawesome-0.1.11.tgz#c1a95a2bdb6a18fa97b355a563832e248bf6ef4a"
+  integrity sha512-sClfojasRifQKI0OPqTy8Ln8iIhnxR/Pv/hukBhWnBz9kQRmqi6JSH3nghlhAY7SUeIIM7B5/D2G8WjX0iepVg==
+  dependencies:
+    prop-types "^15.7.2"
+
 "@graphql-codegen/cli@^1.17.8":
   version "1.17.8"
   resolved "https://registry.yarnpkg.com/@graphql-codegen/cli/-/cli-1.17.8.tgz#06a68894f01796046bb7fa092814948e592e8a75"
@@ -2727,6 +2760,11 @@ bn.js@^5.1.1:
   resolved "https://registry.yarnpkg.com/bn.js/-/bn.js-5.1.3.tgz#beca005408f642ebebea80b042b4d18d2ac0ee6b"
   integrity sha512-GkTiFpjFtUzU9CbMeJ5iazkCzGL3jrhzerzZIuqLABjbwRaFt33I9tUdSNryIptM+RxDet6OKm2WnLXzW51KsQ==
 
+bootstrap-icons@^1.0.0:
+  version "1.0.0"
+  resolved "https://registry.yarnpkg.com/bootstrap-icons/-/bootstrap-icons-1.0.0.tgz#90ed08c9503cef95184972420fbea7b09780bd83"
+  integrity sha512-PaQm3VtSqbUnWuyqGmFJG5iF9UMieDuk8raPOmKOtKeyWyiVshgLoKa+9EWGolGU/nvyBLEBWhZoQqhu9ccNBg==
+
 brace-expansion@^1.1.7:
   version "1.1.11"
   resolved "https://registry.yarnpkg.com/brace-expansion/-/brace-expansion-1.1.11.tgz#3c7fcbf529d87226f3d2f52b966ff5271eb441dd"
`
  expect(splitDiffs(diff)).toEqual([
    `--- a/package.json
+++ b/package.json
@@ -10,7 +10,12 @@
   "dependencies": {
     "@apollo/client": "^3.1.4",
     "@apollo/react-hooks": "^4.0.0",
+    "@fortawesome/fontawesome-svg-core": "^1.2.30",
+    "@fortawesome/free-brands-svg-icons": "^5.14.0",
+    "@fortawesome/free-solid-svg-icons": "^5.14.0",
+    "@fortawesome/react-fontawesome": "^0.1.11",
     "autosize": "^4.0.2",
+    "bootstrap-icons": "^1.0.0",
     "graphql": "^15.3.0",
     "minireset.css": "^0.0.6",
     "next": "9.5.2",`,
    `--- a/src/pages/[userId]/[articleId]/index.module.css
+++ b/src/pages/[userId]/[articleId]/index.module.css
@@ -12,7 +12,7 @@
 }
 
 .userContainer {
-  margin-top: 32px;
+  margin-top: 16px;
   display: flex;
   align-items: center;
 }
@@ -43,3 +43,48 @@
   margin-left: 8px;
   color: #22c;
 }
+
+.twitterIcon {
+  color: #1da1f2;
+}
+
+.userRight {
+  margin-left: auto;
+}
+
+.icon + .icon {
+  margin-left: 16px;
+}
+
+.tag {
+  background-color: yellowgreen;
+  border-radius: 4px;
+  font-size: 14px;
+  padding: 4px;
+}
+
+.tag + .tag {
+  margin-left: 8px;
+}
+
+.articleFooter {
+  margin-top: 16px;
+  border-top: 1px solid #888;
+  border-bottom: 1px solid #888;
+  display: flex;
+  padding: 32px 0;
+}
+
+.userDescription {
+  font-size: 14px;
+}
+
+.articleFooterContainer {
+  margin: 32px 0;
+  display: flex;
+  align-items: center;
+}
+
+.tagContainer {
+  margin: 16px 0;
+}`,
    `--- a/src/pages/[userId]/[articleId]/index.tsx
+++ b/src/pages/[userId]/[articleId]/index.tsx
@@ -1,11 +1,15 @@
 import { useRouter } from 'next/router'
 import { NextPage } from 'next'
 import Error from 'next/error'
+import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
+import { faEllipsisH, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
+import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
 
 import { useGetArticleQuery, Users } from '@/generated/graphql'
 import { Article } from '@/components/article'
 import { SiteHeader } from '@/components/site-header'
 import { UserIcon } from '@/components/user-icon'
+import { Button } from '@/components/button'
 import { formatDate } from '@/utils/date'
 
 import styles from './index.module.css'
@@ -32,12 +36,13 @@ const ArticleHeader: React.FC<ArticleHeaderProps> = ({
         </div>
         <div className={styles.userText}>
           <div className={styles.userId}>
-            {user.displayName} @{user.displayId}
+            {user.displayName} &nbsp;
+            <span className={styles.publishedAt}>
+              <span>{datetime}</span>
+              {isNew ? <span className={styles.newContent}>New</span> : ''}
+              <span> &nbsp;約4分で読めます</span>
+            </span>
           </div>
-          <span className={styles.publishedAt}>
-            <span>{datetime}</span>
-            {isNew ? <span className={styles.newContent}>New</span> : ''}
-          </span>
         </div>
       </div>
     </>
@@ -79,6 +84,33 @@ const ArticlePage: NextPage = () => {
         <div className={styles.content}>
           <Article content={content} />
         </div>
+        <div className={styles.tagContainer}>
+          <span className={styles.tag}>#tag</span>
+          <span className={styles.tag}>#タグ</span>
+        </div>
+        <div className={styles.articleFooterContainer}>
+          <div>
+            <FontAwesomeIcon icon={faThumbsUp} className={styles.icon} />
+            &nbsp; 65536イイネ！
+          </div>
+          <div className={styles.userRight}>
+            <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
+            <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
+            <FontAwesomeIcon icon={faEllipsisH} className={styles.icon} />
+          </div>
+        </div>
+        <div className={styles.articleFooter}>
+          <UserIcon src="/profile.png" />
+          <div className={styles.userText}>
+            <div>{user.displayName}</div>
+            <p className={styles.userDescription}>
+              ほげほげでふがふがをやっています。
+            </p>
+          </div>
+          <div className={styles.userRight}>
+            <Button>Follow</Button>
+          </div>
+        </div>
       </div>
     </>
   )`,
    `--- a/yarn.lock
+++ b/yarn.lock
@@ -1147,6 +1147,39 @@
     exec-sh "^0.3.2"
     minimist "^1.2.0"
 
+"@fortawesome/fontawesome-common-types@^0.2.30":
+  version "0.2.30"
+  resolved "https://registry.yarnpkg.com/@fortawesome/fontawesome-common-types/-/fontawesome-common-types-0.2.30.tgz#2f1cc5b46bd76723be41d0013a8450c9ba92b777"
+  integrity sha512-TsRwpTuKwFNiPhk1UfKgw7zNPeV5RhNp2Uw3pws+9gDAkPGKrtjR1y2lI3SYn7+YzyfuNknflpBA1LRKjt7hMg==
+
+"@fortawesome/fontawesome-svg-core@^1.2.30":
+  version "1.2.30"
+  resolved "https://registry.yarnpkg.com/@fortawesome/fontawesome-svg-core/-/fontawesome-svg-core-1.2.30.tgz#f56dc6791861fe5d1af04fb8abddb94658c576db"
+  integrity sha512-E3sAXATKCSVnT17HYmZjjbcmwihrNOCkoU7dVMlasrcwiJAHxSKeZ+4WN5O+ElgO/FaYgJmASl8p9N7/B/RttA==
+  dependencies:
+    "@fortawesome/fontawesome-common-types" "^0.2.30"
+
+"@fortawesome/free-brands-svg-icons@^5.14.0":
+  version "5.14.0"
+  resolved "https://registry.yarnpkg.com/@fortawesome/free-brands-svg-icons/-/free-brands-svg-icons-5.14.0.tgz#98555518ba41bdff82fbae2f4d1bc36cd3b1c043"
+  integrity sha512-WsqPFTvJFI7MYkcy0jeFE2zY+blC4OrnB9MJOcn1NxRXT/sSfEEhrI7CwzIkiYajLiVDBKWeErYOvpsMeodmCQ==
+  dependencies:
+    "@fortawesome/fontawesome-common-types" "^0.2.30"
+
+"@fortawesome/free-solid-svg-icons@^5.14.0":
+  version "5.14.0"
+  resolved "https://registry.yarnpkg.com/@fortawesome/free-solid-svg-icons/-/free-solid-svg-icons-5.14.0.tgz#970453f5e8c4915ad57856c3a0252ac63f6fec18"
+  integrity sha512-M933RDM8cecaKMWDSk3FRYdnzWGW7kBBlGNGfvqLVwcwhUPNj9gcw+xZMrqBdRqxnSXdl3zWzTCNNGEtFUq67Q==
+  dependencies:
+    "@fortawesome/fontawesome-common-types" "^0.2.30"
+
+"@fortawesome/react-fontawesome@^0.1.11":
+  version "0.1.11"
+  resolved "https://registry.yarnpkg.com/@fortawesome/react-fontawesome/-/react-fontawesome-0.1.11.tgz#c1a95a2bdb6a18fa97b355a563832e248bf6ef4a"
+  integrity sha512-sClfojasRifQKI0OPqTy8Ln8iIhnxR/Pv/hukBhWnBz9kQRmqi6JSH3nghlhAY7SUeIIM7B5/D2G8WjX0iepVg==
+  dependencies:
+    prop-types "^15.7.2"
+
 "@graphql-codegen/cli@^1.17.8":
   version "1.17.8"
   resolved "https://registry.yarnpkg.com/@graphql-codegen/cli/-/cli-1.17.8.tgz#06a68894f01796046bb7fa092814948e592e8a75"
@@ -2727,6 +2760,11 @@ bn.js@^5.1.1:
   resolved "https://registry.yarnpkg.com/bn.js/-/bn.js-5.1.3.tgz#beca005408f642ebebea80b042b4d18d2ac0ee6b"
   integrity sha512-GkTiFpjFtUzU9CbMeJ5iazkCzGL3jrhzerzZIuqLABjbwRaFt33I9tUdSNryIptM+RxDet6OKm2WnLXzW51KsQ==
 
+bootstrap-icons@^1.0.0:
+  version "1.0.0"
+  resolved "https://registry.yarnpkg.com/bootstrap-icons/-/bootstrap-icons-1.0.0.tgz#90ed08c9503cef95184972420fbea7b09780bd83"
+  integrity sha512-PaQm3VtSqbUnWuyqGmFJG5iF9UMieDuk8raPOmKOtKeyWyiVshgLoKa+9EWGolGU/nvyBLEBWhZoQqhu9ccNBg==
+
 brace-expansion@^1.1.7:
   version "1.1.11"
   resolved "https://registry.yarnpkg.com/brace-expansion/-/brace-expansion-1.1.11.tgz#3c7fcbf529d87226f3d2f52b966ff5271eb441dd"`,
  ])
})
