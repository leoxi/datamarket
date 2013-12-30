(ns datamarket.session
  (:require [noir.session :as session]))

(defn get-user-from-session []
  (session/get :username ""))

(defn put-user-to-session! [name]
  (session/put! :username name))
