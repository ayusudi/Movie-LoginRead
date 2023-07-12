# Overview 
- dotenv (devDependencies)

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
- route
- middleware
  - req 
  - res
  - next

Authentication 
  - req.headers.access_token ? 
  - access_token -> payload : jwt.verify (helper)
  - payload : id milik user -> pastikan ke databse 
  - next()

Authorization
  - Tergantung dari logic bisnis app yang diminta
  > Admin bisa menghapus movie milik siapa saja 
  > User bisa menghapus movie milik diri sendiri

- errorhandler : diimplementasikan di bawah routes 
  - err
  - req
  - res
  - next

- cors 
app.use(cors())

---


|           Movies            |
|-----------------------------|
| id (int, serial)            |
| title (varchar, string)     |
| overview (text)             |
| rating (float)              |
| poster (varchar, string)    |
| createdAt (date)            |
| updatedAt (date)            |

Kita buat REST API untuk fitur CRD berserta API Documentation ya.

> Note : pada challenge gunakan express.Router & Controller.

`dummy cover_url https://dummyimage.com/600x400/000000/ffffff`

### Create API Documentation 

Define : 
- HTTP Method
- Routes
- Request 
  - Header
  - Body (Input : urlencoded, raw json, form data)
- Response
  - Status Code 
  - Body (Output JSON)
- Error Response (Status Code 4** & 5**)

https://gist.github.com/ziterz/56d2cd8b2d5f5d52101265c0182c2aff  