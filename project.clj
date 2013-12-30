(defproject datamarket "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojure-contrib "1.2.0"]
                 [clj-time "0.6.0"]
                 [lib-noir "0.7.8"]
                 [selmer "0.5.4"]
                 [mysql/mysql-connector-java "5.1.6"]
                 [korma "0.3.0-RC6"]
                 [compojure "1.1.6"]]
  :plugins [[lein-ring "0.8.8"]]
  :ring {:handler datamarket.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
