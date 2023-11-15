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
```markdown
headers:token
paramas:userId
``````
#### *Response (200)*
```markdown
{
  "message": "Your account has been succesfully deleted"
}
``````
## Photos

### Post photo
#### Endpoint: POST `photos`

#### *Request Header*
```markdown
headers: token
``````

#### *Request Body*
```markdown
{
  "success": "<posted success>",
  "low_point": "<posted low point>",
  "take_away": "<posted take away>"
}
``````

#### *Response (200)*
``````markdown
{
  "id": <given id by system>,
  "success": "<posted success>",
  "low_point": "<posted low point>",
  "take_away": "<posted take away>",
  "UserId": "<UserId>",
  "createdAt": "2023-04-20T07:15:12.149Z",
  "updatedAt": "2023-04-20T07:15:12.149Z",
}
``````

### *Response (401)*
```markdown
{
  "message": "Unauthorized"
}
``````


### Delete User Reflection By ID
#### Endpoint: DELETE `/reflections/:id`
#### *Request Header*
```markdown
{
  "Authorization": "bearer <your access token>"
}
``````
#### *Request Params*
```markdown
{
  "id": "<id reflections>"
}
`````
### Delete Sukses
#### *Response (200)*
```markdown
{
  "message": "Success delete"
}
`````

#### *Response (401)*
```markdown
{
  "message": "Unauthorized"
}
`````
## Lisensi

Proyek REFLECTION API tidak dilisensikan dikarenakan proyek ini hanya untuk pembelajaran.

## Penutup

Kami sangat terbuka terhadap kontribusi. Jika Anda ingin berkontribusi pada proyek ini, silakan buka Issues atau Pull Requests. Kami selalu menyambut kontribusi yang konstruktif.

Sekian Panduan singkat dari proyek kecil kami, Terima kasih!
