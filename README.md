# My Gram

Proyek ini dikembangkan sebagai bagian dari tugas Final Project  dari kedua Hacktivate Indonesia.

## Deskripsi

Proyek MyGram ini dapat menyimpan foto, membuat comment unntuk orang lain dan dilengkapi dengan proses CRUD dengan table

## Panduan API

## User
### Register User
#### Endpoint: POST `/users/register`
##### Dengan Mengirimkan request body :
```markdown
{
  "email": "<email>",
  "full_name": "<full name>",
  "username": "<username>"
  "password": "<password>",
  "profile_image_url": "<photo>",
  "age": "<age>",
  "phone_number": "<phone number>"
}
```
##### Output dari endpoint ini :

###### *Response (201 - Created)*

```markdown
{
  "user": {
    "email": "<email>",
    "full_name": "<full name>",
    "username": "<username>"
    "profile_image_url": "<photo>",
    "age": "<age>",
    "phone_number": "<phone number>"
  }
}
```
Notes: password user harus dihash menggunakan Bcrypt sebelum disimpan didatabase

### Login User

#### Endpoint: POST `/users/Login`
#### *Request Body*
```markdown
{
  "email": "<email>",
  "password": "<password>"
}
`````

#### *Response (200)*
```markdown
{
  "token": "<jwt token>"
}
`````
notes: harus melakukan logika user login untuk melakukan pengecekan email dan password user dan pengecekan password menggunakan package Bcrypt

### Put User by id
#### Endpoint: PUT `/users/:userId`
  headers:token
  paramas:userId
#### *Request body*
```markdown
{
  "email": "<email>",
  "full_name": "<full name>",
  "username": "<username>"
  "profile_image_url": "<photo>",
  "age": "<age>",
  "phone_number": "<phone number>"
}
``````
#### *Response (200)*
```markdown
{
  "user": {
    "email": "<email>",
    "full_name": "<full name>",
    "username": "<username>"
    "profile_image_url": "<photo>",
    "age": "<age>",
    "phone_number": "<phone number>"
  }
}
```````
notes: endpoint ini memrlukan proses autentikasi dan autorisasi. proses autorisasinya adalah user hanya boleh melakukan update pada data dirinya sendiri

### Delete User by id
#### Endpoint: DELETE `user/:userId`
#### *Request Header*

headers:token
paramas:userId

#### *Response (200)*
```markdown
{
  "message": "Your account has been succesfully deleted"
}
``````

## Photos

### Post photo
#### Endpoint: POST `/photos`

#### *Request Header*

headers: token
#### *Request Body*
```markdown
{
  "poster_image_url": "<photo>",
  "title": "<title>",
  "caption": "<caption>"
}
``````

#### *Response (201)*
``````markdown
{
  "id": <given id by system>,
  "poster_image_url": "<photo>",
  "title": "<title>",
  "caption": "<caption>"
  "UserId": "<UserId>"
}
``````

notes: endpoint ini perlu melewati proses autentikasi dengan package JsonWebToken

### Get Photo
#### endpoint: GET `/photos`

#### *Request Body*
headers:token

#### *Response (200)*
```markdown
{
  "photos": [
    {
       "id": <given id by system>,
       "title": "<title>",
       "caption": "<caption>"
       "poster_image_url": "<photo>",
       "UserId": "<UserId>",
       "createAt" "<date>",
       "updateAt" "<date>",
       "Comments": [
         {
           "comments": "<comments>",
           "User": {
             "username": "<username>"
           }
         }
       ],
       "User": {
         "id": <given id by system>,
         "username": "<username>",
         "profile_image_url": "<photo>"
       }
    }
  ]
}
``````

notes: endpoint ini perlu melewati proses autentikasi dengan package JsonWebToken

### Put photos By ID
#### Endpoint: PUT `/photos/:photoid`
#### *Request Body*
```markdown
{
  "title": "<title>",
  "caption": "<caption>"
  "poster_image_url": "<photo>"
}
``````
  
#### *Response (200)*
```markdown
{
  "photos":
    {
       "id": <given id by system>,
       "title": "<title>",
       "caption": "<caption>"
       "poster_image_url": "<photo>",
       "UserId": "<UserId>",
       "createAt" "<date>",
       "updateAt" "<date>",
    }
}
`````
notes: endpoint ini perlu melewati proses autentikasi dan autorisasi dengan JsonWebToken

### Delete photos By ID
#### Endpoint: DELETE `/photos/:photoid`
#### *Request Body*
headers:token
params:photoId
  
#### *Response (200)*
```markdown
{
  "message": "Your photo has been succesfully deleted"
}
``````
notes: endpoint ini perlu melewati proses autentikasi dan autorisasi dengan JsonWebToken dan bisa terhapus dengan photo milliknya sendiri

## Comments

### Post comments
#### Endpoint: POST `/commets`

#### *Request Header*
headers: token

#### *Request Body*
```markdown
{
  "comment": "<comment>",
  "PhotoId": "<photoId>"
}
``````

#### *Response (201)*
``````markdown
{
  "comment": {
    "id": <given id by system>,
    "comment": "<comment>",
    "UserId": "<UserId>",
    "PhotoId": "<photoId>",
    "createAt" "<date>",
    "updateAt" "<date>"
  }
}
``````

notes: endpoint ini perlu melewati proses autentikasi dan autorisasi dengan package JsonWebToken

### Get comments
#### endpoint: GET `/comments`

#### *Request Body*
headers:token

#### *Response (200)*
```markdown
{
  "commets": [
    {
       "id": <given id by system>,
       "UserId": "<UserId>",
       "PhotoId": "<photoId>",
       "comment": "<comment>",
       "createAt" "<date>",
       "updateAt" "<date>",
       "Photo": {
           "id": <given id by system>,
           "title": "<title>",
           "caption": "<caption>"
           "poster_image_url": "<photo>"
         },
       "User": {
         "id": <given id by system>,
         "username": "<username>",
         "profile_image_url": "<photo>",
         "phone_number": "<phone number>"
       }
    }
  ]
}
``````

notes: endpoint ini perlu melewati proses autentikasi dengan package JsonWebToken

### Put comments By ID
#### Endpoint: PUT `/comments/:commentsId`
#### *Request Body*
```markdown
{
  "comment": "<comment>"
}
``````
  
#### *Response (200)*
```markdown
{
  "comments":
    {
       "id": <given id by system>,
       "comment": "<comment>",
       "UserId": "<UserId>",
       "PhotoId": "<photoId>",
       "createAt" "<date>",
       "updateAt" "<date>",
    }
}
`````
notes: endpoint ini perlu melewati proses autentikasi dan autorisasi dengan JsonWebToken dan alur proses autorisasinya hanya boleh mengupdate data comment miliknya sendiri

### Delete comments By ID
#### Endpoint: DELETE `/comments/:commentsId`
#### *Request Body*
headers:token
params:commentsId
  
#### *Response (200)*
```markdown
{
  "message": "Your comments has been succesfully deleted"
}
``````
notes: endpoint ini perlu melewati proses autentikasi dan autorisasi dengan JsonWebToken dan bisa terhapus dengan comments milliknya sendiri

## SocialMedias

### Post comments
#### Endpoint: POST `/socialmedias`

#### *Request*
headers: token
body: 
```markdown
{
  "comment": "<comment>",
  "PhotoId": "<photoId>"
}
``````

#### *Response (201)*
``````markdown
{
  "social_media": {
    "id": <given id by system>,
    "name": "<nama>",
    "social_media_url": "<data>",
    "UserId": "<UserId>",
    "createAt" "<date>",
    "updateAt" "<date>"
  }
}
``````

notes: endpoint ini perlu melewati proses autentikasi dan autorisasi dengan package JsonWebToken

### Get socialmedias
#### endpoint: GET `/socialmedias`

#### *Request Body*
headers:token

#### *Response (200)*
```markdown
{
  "social_medias": [
    {
       "id": <given id by system>,
       "name": "<nama>",
       "social_media_url": "<data>",
       "UserId": "<UserId>",
       "createAt" "<date>",
       "updateAt" "<date>"
       "User": {
           "id": <given id by system>,
           "username": "<username>",
           "poster_image_url": "<photo>"
         }
    }
  ]
}
``````

notes: endpoint ini perlu melewati proses autentikasi dengan package JsonWebToken

### Put socialmedias
#### Endpoint: PUT `/socialmedias`
#### *Request*
headers: token
params: socialMediaId
body:
```markdown
{
  "name": "<nama>",
  "social_media_url": "data" 
}
``````
  
#### *Response (200)*
```markdown
{
  "social_media":
    {
       "id": <given id by system>,
       "name": "<nama>",
       "social_media_url": "<data>",
       "UserId": "<UserId>",
       "createAt" "<date>",
       "updateAt" "<date>"
    }
}
`````
notes: endpoint ini perlu melewati proses autentikasi dan autorisasi dengan JsonWebToken dan alur proses autorisasinya hanya boleh mengupdate data comment miliknya sendiri

### Delete socialmedias By ID
#### Endpoint: DELETE `/socialmedias/:socialMediaId`
#### *Request Body*
headers:token
params:socalMediaId
  
#### *Response (200)*
```markdown
{
  "message": "Your social media has been succesfully deleted"
}
``````
notes: endpoint ini perlu melewati proses autentikasi dan autorisasi dengan JsonWebToken dan bisa terhapus dengan comments milliknya sendiri


## Penutup

Kami sangat terbuka terhadap kontribusi. Jika Anda ingin berkontribusi pada proyek ini, silakan buka Issues atau Pull Requests. Kami selalu menyambut kontribusi yang konstruktif.

Sekian Panduan singkat dari proyek kecil kami, Terima kasih!
