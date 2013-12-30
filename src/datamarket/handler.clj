(ns datamarket.handler
  (:use compojure.core
        datamarket.validation
        datamarket.session
        [selmer.parser :only [render-file]])
  (:require [compojure.handler :as handler]
            [compojure.route :as route]
            [noir.response :as resp]
            [noir.session :as session]
            [datamarket.db :as db]))

(defn homepage []
  (render-file "datamarket/views/index.html"
               {:user (get-user-from-session)}))

;; register
(defn register []
  (render-file "datamarket/views/reg.html"
               {}))

(defn reg-submit [fields]
  (if (reg-valid? fields)
    (do
      (db/add-user fields)
      (put-user-to-session! (get fields :name))
      (resp/redirect "/"))
    (render-file "datamarket/views/reg.html"
                 {:fields fields :errors @error-msg})))

;; login
(defn login []
  (render-file "datamarket/views/login.html"
               {}))

(defn login-submit [fields]
  (if (login-valid? fields)
    (do
      (let [user (get fields :name)]
        (put-user-to-session! user)
        (db/update-login-time user)
        (resp/redirect "/account")))
    (render-file "datamarket/views/login.html"
                 {:fields fields :errors @error-msg})))

;; logout
(defn logout []
  (session/clear!)
  (resp/redirect "/"))

;; account
(defn account []
  (let [user (get-user-from-session)]
    (render-file "datamarket/views/account/index.html"
                 {:user user
                  :user-info (first (db/get-user-by-name user))})))

(defn account-password []
  (render-file "datamarket/views/account/password.html"
               {:user (get-user-from-session)}))

(defn account-password-change [fields]
  (if (password-change-valid? fields)
    (do
      (db/update-password (get-user-from-session) (get fields :password))
      (render-file "datamarket/views/account/index.html"
                   {:user (get-user-from-session)
                    :error @error-msg}))
    (render-file "datamarket/views/account/password.html"
                 {:user (get-user-from-session)
                  :error @error-msg})))

;; service
(defn service []
  (render-file "datamarket/views/service.html"
               {:user (get-user-from-session)}))

;; product
(defn product []
  (render-file "datamarket/views/product/index.html"
               {:user (get-user-from-session)
                :info (db/get-all-products)}))

(defn product-public []
  (render-file "datamarket/views/product/public.html"
               {:user (get-user-from-session)}))

(defn product-submit [fields]
  (if (product-submit-valid? fields)
    (do
      (let [user-id (get (first (db/get-user-id (get-user-from-session))) :id)]
        (db/add-product user-id fields)
        (resp/redirect "/product")))
    (render-file "datamarket/views/product/public.html"
                 {:user (get-user-from-session)
                  :error @error-msg})))

(defn product-publiced []
  (let [user-id (get (first (db/get-user-id (get-user-from-session))) :id)]
    (render-file "datamarket/views/product/publiced.html"
                 {:user (get-user-from-session)
                  :info (db/get-products-by-user-id user-id)})))

(defn product-downloaded []
  (render-file "datamarket/views/product/downloaded.html"
               {:user (get-user-from-session)}))

(defn product-detail [id]
  (render-file "datamarket/views/detail.html"
               {:user (get-user-from-session)
                :info (first (db/get-info-by-product-id id))}))

;; application
(defn application []
  (render-file "datamarket/views/application/index.html"
               {:user (get-user-from-session)
                :info (db/get-all-apps)}))

(defn app-submit [fields]
  (if (app-submit-valid? fields)
    (let [id (get (first (db/get-user-id (get-user-from-session))) :id)]
      (db/add-application id fields)
      (resp/redirect "/application"))
    (render-file "datamarket/views/application/public.html"
                 {:user (get-user-from-session)
                  :error @error-msg})))

(defn application-public []
  (render-file "datamarket/views/application/public.html"
               {:user (get-user-from-session)}))

(defn application-publiced []
  (let [user-id (get (first (db/get-user-id (get-user-from-session))) :id)]
    (render-file "datamarket/views/application/publiced.html"
                 {:user (get-user-from-session)
                  :info (db/get-apps-by-user-id user-id)})))

(defn application-detail [id]
  (render-file "datamarket/views/detail.html"
               {:user (get-user-from-session)
                :info (first (db/get-info-by-app-id id))
                :app true}))

;; union
(defn union []
  (render-file "datamarket/views/union.html"
               {:user (get-user-from-session)}))

;; routes
(defroutes app-routes
  (GET "/" [] (homepage))

  (GET "/register" [] (register))
  (POST "/reg-submit" [& fields]
    (reg-submit fields))

  (GET "/login" [] (login))
  (POST "/login-submit" [& fields]
    (login-submit fields))
  (GET "/logout" [] (logout))

  (GET "/account" [] (account))
  (GET "/account/password" [] (account-password))
  (POST "/account/password/change" [& fields]
    (account-password-change fields))

  (GET "/service" [] (service))

  (GET "/product" [] (product))
  (GET "/product/public" [] (product-public))
  (POST "/product/product-submit" [& fields]
    (product-submit fields))
  (GET "/product/publiced" [] (product-publiced))
  (GET "/product/downloaded" [] (product-downloaded))
  (GET "/product/:id" [id] (product-detail id))

  (GET "/application" [] (application))
  (GET "/application/public" [] (application-public))
  (POST "/application/app-submit" [& fields]
    (app-submit fields))
  (GET "/application/publiced" [] (application-publiced))
  (GET "/application/:id" [id] (application-detail id))

  (GET "/union" [] (union))
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
  (-> app-routes
      handler/site
      session/wrap-noir-session))
