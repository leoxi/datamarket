(ns datamarket.validation
  (:use [noir.validation :only [has-value? has-values? is-email?]]
        datamarket.session)
  (:require [datamarket.db :as db]))

(def error-msg (atom ""))


(defn- reg-get-error [fields]
  (if-not (has-values? fields)
    (reset! error-msg "请您完善所需内容")
    (let [{:keys [name password re-password company contract phone mail]} fields]
      (cond
       (db/user-exists? name) (reset! error-msg "该用户名已被注册")
       (not (= password re-password)) (reset! error-msg "两次输入密码不相同")
       (not (is-email? mail)) (reset! error-msg "邮箱格式不正确")
       :else false))))

(defn reg-valid? [fields]
  (->> fields
       (reg-get-error)
       (boolean)
       (not)))


(defn- login-get-error [fields]
  (if-not (has-values? fields)
    (reset! error-msg "请完善所需内容")
    (let [{:keys [name password]} fields]
      (if-not (db/login-valid? name password)
        (reset! error-msg "账号或密码错误")
        false))))

(defn login-valid? [fields]
  (->> fields
       (login-get-error)
       (boolean)
       (not)))


(defn- password-change-get-error [fields]
  (if-not (has-values? fields)
    (reset! error-msg "请完善所需内容")
    (let [{:keys [old-password password re-password]} fields]
      (cond
       (not (db/valid-password? (get-user-from-session) old-password)) (reset! error-msg "原始密码错误")
       (not= password re-password) (reset! error-msg "两次密码输入不同")
       (< (count password) 6) (reset! error-msg "新密码长度过短")))))

(defn password-change-valid? [fields]
  (->> fields
       (password-change-get-error)
       (boolean)
       (not)))


(defn- product-submit-get-error [fields]
  (if-not (has-values? fields)
    (reset! error-msg "请完善所需内容")
    (let [{:keys [title desc format category source_type source price]} fields]
      (cond
       (not (instance? Number (read-string price))) (reset! error-msg "请输入正确的价格")))))

(defn product-submit-valid? [fields]
  (->> fields
       (product-submit-get-error)
       (boolean)
       (not)))


(defn- app-submit-get-error [fields]
  (if-not (has-values? fields)
    (reset! error-msg "请完善所需内容")
    (let [{:keys [title desc link category source_type source price]} fields]
      (cond
       (not (re-seq #"^http" link)) (reset! error-msg "演示地址必需由http开头")
       (not (instance? Number (read-string price))) (reset! error-msg "请输入正确的价格")))))

(defn app-submit-valid? [fields]
  (->> fields
       (app-submit-get-error)
       (boolean)
       (not)))
