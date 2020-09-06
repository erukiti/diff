import { NextPage } from 'next'

import { MixedDiff } from '@/components/mixed-diff'
import { parseSingleUnifiedDiff } from '@/diff'

const IndexPage: NextPage = () => {
  const diffs = [
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
  ]
  return (
    <div>
      {diffs.map((diffText, i) => {
        const res = parseSingleUnifiedDiff(diffText)
        return <MixedDiff {...res} key={i} />
      })}
    </div>
  )
}

export default IndexPage
