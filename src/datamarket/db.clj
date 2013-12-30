(ns datamarket.db
  (:use korma.core
        korma.db
        [clj-time.coerce :only [to-sql-date]]
        [clj-time.local :only [local-now]])
  (:require [datamarket.config :as cfg]
            [noir.util.crypt :as crypt]))

;; init
(defdb mys
  (mysql {:db cfg/db
          :user cfg/user
          :password cfg/passwd}))

(declare users products user_product dim_format dim_catalog dim_source dim_optype)

(defentity users
  (table :dm_user)
  (entity-fields :id :name :password :company :contact :phone :mail :register_time :last_login_time)
  (has-one products))

(defentity products
  (table :dm_product)
  (entity-fields :id :dm_user_id :pubtime :type :title :desc :dm_dim_format_id :dm_dim_catalog_id :dm_dim_source_id :tags :price :file_links :dm_dim_optype_id)
  (belongs-to users)
  (belongs-to dim_format)
  (belongs-to dim_catalog)
  (belongs-to dim_source)
  (belongs-to dim_optype))

(defentity user_product
  (table :dm_user_product)
  (entity-fields :user_id :product_id :opt_type :opt_time :user_ip))

;; 1 文本 2 图片 3 视频 4 音频
(defentity dim_format
  (table :dm_dim_format)
  (entity-fields :id :format_name)
  (has-one products))

;; 1 电信 2 金融 3 政府 4 互联网 5 医疗
(defentity dim_catalog
  (table :dm_dim_catalog)
  (entity-fields :id :catalog_name)
  (has-one products))

;; 1 公共数据 2 联盟数据
(defentity dim_source
  (table :dm_dim_source)
  (entity-fields :id :source_name)
  (has-one products))

;; 1 登录 2 查看 3 上传 4 下载
(defentity dim_optype
  (table :dm_dim_optype)
  (entity-fields :id :opt_type)
  (has-one products))


;;
(def ^{:private true} get-users
  (-> (select* users)))

(def ^{:private true} get-products
  (-> (select* products)
      (with dim_format)
      (with dim_catalog)
      (with dim_source)))

(defn get-user-id [name]
  (-> get-users
      (fields :id)
      (where {:name name})
      (exec)))

(defn get-user-by-name [name]
  (-> get-users
      (where {:name name})
      (exec)))

(defn- get-password-by-name [name]
  (-> get-users
      (fields :password)
      (where {:name name})
      (exec)))

(defn- get-things [id type]
  (-> get-products
      (where {:dm_user_id id
              :type type})
      (order :id :DESC)
      (exec)))

(defn get-products-by-user-id [id]
  (get-things id 1))

(defn get-apps-by-user-id [id]
  (get-things id 2))

(defn get-all-products []
  (-> get-products
      (where {:type 1})
      (order :pubtime :DESC)
      (exec)))

(defn get-all-apps []
  (-> get-products
      (where {:type 2})
      (order :pubtime :DESC)
      (exec)))

(defn get-info-by-product-id [id]
  (-> get-products
      (where {:id id})
      (exec)))

(defn get-info-by-app-id [id]
  (-> get-products
      (where {:id id})
      (exec)))

;; Param is a map
(defn add-user [params]
  (let [{:keys [name password re-password company contract phone mail]} params]
    (insert users
      (values {:name name :password (crypt/encrypt password) :company company :contract contract :phone phone :mail mail :register_time (to-sql-date (local-now)) :last_login_time (to-sql-date (local-now))}))))

(defn user-exists?
  "Return true if user exists"
  [name]
  (not (nil? (seq (get-user-by-name name)))))

(defn valid-password? [user pass]
  (crypt/compare pass
                 (-> user
                     get-password-by-name
                     first
                     (get :password))))

(defn login-valid? [name password]
  (and (user-exists? name)
       (valid-password? name password)))

(defn valid-password? [user pass]
  (crypt/compare pass
                 (-> user
                     get-password-by-name
                     first
                     (get :password))))

(def ^{:private true} update-users
  (-> (update* users)))

(defn update-login-time [name]
  (-> update-users
      (set-fields {:last_login_time (to-sql-date (local-now))})
      (where {:name name})
      (exec)))

(defn update-password [name pass]
  (-> update-users
      (set-fields {:password (crypt/encrypt pass)})
      (where {:name name})
      (exec)))

;; product
(defn add-product [user-id params]
  (let [{:keys [title desc format category source_type source price]} params]
    (insert products
      (values {:dm_user_id user-id :title title :desc desc :dm_dim_catalog_id category :dm_dim_source_id source_type :dm_dim_format_id format :price price :file_links "" :tags "" :type 1 :pubtime (to-sql-date (local-now))}))))

;; application
(defn add-application [user-id params]
  (let [{:keys [title desc link category source_type source price]} params]
    (insert products
      (values {:dm_user_id user-id :title title :desc desc :dm_dim_catalog_id category :dm_dim_source_id source_type :price price :file_links link :tags "" :type 2 :pubtime (to-sql-date (local-now))}))))
