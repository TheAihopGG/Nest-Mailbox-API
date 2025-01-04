# Api Reference

## Navigation in this hell

- [Mailbox](#mailbox)
  - [Create mailbox](#createmailbox)
  - [Delete mailbox](#deletemailbox)
  - [Auth](#auth)
- [Message](#message)
  - [Send message](#sendmessage)
  - [Edit message](#editmessage)
  - [Delete message](#deletemessage)
  - [Message](#message-1)
  - [Messages](#messages)

> [!NOTE]
> There may be mistakes in the text. Enjoy the reading

## Mailbox

### createMailbox

`POST /api/createMailbox/?name=<>&password=<>`

#### Response 200

```json
{
    "cookies": {
        "sessionId":"<id>"
    },
    "detail": {
        "msg":"Mailbox just created"
    }
}
```

#### Response 404

If name is existing:

```json
{
    "detail": {
        "msg":"This name already exists"
    }
}
```

### deleteMailbox

`POST /api/deleteMailbox/?id=<>&password=<>`

#### Response 200

```json
{
    "detail": {
        "msg":"Mailbox just deleted"
    }
}
```

#### Response 404

```json
{
    "detail": {
        "msg":"Mailbox has not found"
    }
}
```

### auth

`POST /api/auth/?mailboxName=<>&password=<>`

#### Response 200

```json
{
    "cookies": {
        "sessionId":"<id>"
    },
    "detail": {
        "msg":"You just authorized"
    }
}
```

#### Response 404

```json
{
    "detail": {
        "msg":"Mailbox has not found"
    }
}
```

## Message

### sendMessage

`GET /api/sendMessage/?from=<>&to=<>&content=<>`

Cookies:

```json
{
    "sessionId":"<string>"
}
```

#### Response 200

```json
{
    "detail": {
        "msg":"Message just sended"
    }
}
```

#### Response 404

If `from` is not exists:

```json
{
    "detail": {
        "msg":"Incorrect `from` parameter: <from-value> is not existing"
    }
}
```

If `to` is not exists:

```json
{
    "detail": {
        "msg":"Incorrect `to` parameter: <to-value> is not existing"
    }
}
```

### editMessage

`GET /api/editMessage/?id=<>&content=<>`

Cookies:

```json
{
    "sessionId":"<string>"
}
```

#### Response 200

```json
{
    "detail": {
        "msg":"Message just edited"
    }
}
```

#### Response 404

If message has not found:

```json
{
    "detail": {
        "msg":"Message has not found"
    }
}
```

### deleteMessage

`GET /api/deleteMessage/?id=<>&mailboxId=<>`

Cookies:

```json
{
    "sessionId":"<string>"
}
```

#### Response 200

```json
{
    "detail": {
        "msg":"Message has deleted"
    }
}
```

#### Response 401

If session id is missed:

```json
{
    "detail": {
        "msg":"Session id is required"
    }
}
```

#### Response 403

If session id is incorrect:

```json
{
    "detail": {
        "msg":"Session id is incorrect"
    }
}
```

#### Response 404

```json
{
    "detail": {
        "msg":"Mailbox has not found"
    }
}
```

### message

`GET /api/message/?messageId=<>`

Cookies:

```json
{
    "sessionId":"<string>"
}
```

#### Response 200

```json
{
    "id":"<string>",
    "mailboxId":"<string>",
    "content":"<string>",
    "sendedDate":"<number>"
}
```

#### Response 401

If session id is missed:

```json
{
    "detail": {
        "msg":"Session id is required"
    }
}
```

#### Response 403

If session id is incorrect:

```json
{
    "detail": {
        "msg":"Session id is incorrect"
    }
}
```

#### Response 404

```json
{
    "detail": {
        "msg":"Message has not found"
    }
}
```

### messages

`GET /api/messages/?mailboxId=<>`

Cookies:

```json
{
    "sessionId":"<string>"
}
```

#### Response 200

```json
{
    "messages": [
        {
            "id":"<string>",
            "mailboxId":"<string>",
            "content":"<string>",
            "sendedDate":"<number>"
        },
        {
            "id":"<string>",
            "mailboxId":"<string>",
            "content":"<string>",
            "sendedDate":"<number>"
        }
    ]
}
```

#### Response 401

If session id is missed:

```json
{
    "detail": {
        "msg":"Session id is required"
    }
}
```


#### Response 403

If session id is incorrect:

```json
{
    "detail": {
        "msg":"Session id is incorrect"
    }
}
```

#### Response 404

```json
{
    "detail": {
        "msg":"Mailbox has not found"
    }
}
```
