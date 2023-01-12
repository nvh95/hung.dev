---
template: post
vietnamese: true
title: Slack API hay là câu chuyện giật lì xì
slug: slack-api-lixi
draft: false
date: 2021-02-11T18:11:23.006Z
description: Cách post slack message on your behalf sử dụng Slack API
category: Blog
tags:
  - slack api
  - slack message
  - send slack message on your behalf
---

### Mở đầu

Trước tiên, mình xin gửi đến bạn, những độc giả đang theo dõi blog **hung.dev** một năm mới Tân Sửu thật nhiều niềm vui và sự may mắn. Cầu mong sự an lành và thịnh vượng sẽ tới với bạn và gia đình trong năm 2021 này.

Quay trở lại chủ đề chính, hôm nay mình mới biết đến ở [Got It](https://www.got-it.ai) có rất nhiều anh em đi làm chỉ vì đam mê, mà điển hình là câu chuyện của cậu em rất thân với mình.

![li-xi](/media/screenshot-2021-02-12-at-00.55.56.png "Lì xì")

Tóm gọn là cậu em sẽ phát lì xì cho 20 người đầu tiên reply vào thread bên trên trên Slack, và người nhanh tay nhất sẽ nhận được nhiều tiền nhất. Mình cũng rất muốn ăn được số tiền nhiều nhất đó, nhưng thời khắc đất trời chuyển mình mình lại ngồi mở máy tính, nhìn đồng hồ, tay rà phím enter thì cũng không có vui lắm, mình còn phải đi xông đất nữa. Lại được inspired bởi [AI Dinesh](https://www.youtube.com/watch?v=2TpSWVN4zkg) trong bộ phim Silicon Valley. Mình quyết định sử dụng **Slack API** để có thể ăn được giải đó nhưng vẫn không cần ngồi canh đồng hồ.

![AI Dinesh](/media/maxresdefault.jpg "AI Dinesh")

### Thực thi

Nói sơ qua về cách làm: (1) mình sẽ sử dụng một con Slack Bot, sau đó (2) trao quyền cho nó để nó có thể (3) gửi tin nhắn dưới danh tính của mình.

#### Tạo slack bot

Rất đơn giản, bạn chỉ cần truy cập vào <https://api.slack.com/apps/new> để tạo một con bot (App) mới, điền thông tin về **App name** và **Workspace** mà bạn muốn tích hợp nó vào

![New Slack App](/media/screenshot-2021-02-12-at-02.16.15.png "New Slack App")

#### Trao quyền cho bot

Bước quan trọng tiếp theo đó là cần trao quyền cho con bot để nó có thể gửi tin nhắn thay mình (send message on your behalf). Ở màn hình sau khi tạo app xong, chọn **OAauth & Permissions**, sau đó scroll xuống và chọn quyền **chat:write** ở dưới mục **User Token Scopes**.

![permission](/media/screenshot-2021-02-12-at-02.17.23.png "permission")

Tada. Vậy là bạn đã cấp quyền xong cho con bot. Bây giờ hãy install con bot ở mục **Install App**. Sau khi hoàn thành, bạn sẽ có **token** để sử dụng Slack API.

![token](/media/screenshot-2021-02-12-at-02.40.25.png "token")

#### Gửi tin nhắn

Để gửi tin nhắn, ta sẽ sử dụng endpoint <https://api.slack.com/methods/chat.postMessage>. Tới đây bạn có thể sử dụng SDK của Slack để gửi tin nhắn bằng ngôn ngữ mà bạn quen thuộc (Python, Javascript...), hoặc tạo request bằng Postman hay cURL. Trong tình huống của mình, mình sẽ sử dụng công cụ **Tester** ngay trên trang document của Slack API. Về cách sử dụng trong document cũng nói rất rõ nhưng tóm gọn lại sẽ có vài trường cần lưu ý:

\- **token**: Token của con bot bạn mới có từ bước trước

\- **channel**: channel mà bạn muốn gửi tin nhắn. Có thể là một kênh bất kỳ hoặc Direct Message. Bạn lấy giá trị của channel bằng cách chuột phải vào cuộc hội thoại và chọn Copy Link, phần giá trị sau cùng sẽ là giá trị bạn cần truyền vào. Ví dụ `C1234567890`

\- **as_user**: set là true, nếu bạn muốn con bot gửi tin nhắn dưới danh tính của mình

\- **text**: nội dung bạn muốn nhắn

\- **thread_ts**: trong trường hợp bạn muốn gửi tin nhắn đến một thread, bạn cần truyền giá trị này vào. Cái này hơi tricky một chút. Bạn cần copy link của thread rồi biến đổi một chút, ví dụ link thread của bạn là

```
https://yourworkspace.slack.com/archives/G01N6H4GUSV/p161305029701030
```

thì thread id sẽ là `1613050297.010300`. Mình có viết một hàm để transform từ link thread sang `thread_ts`, các bạn có thể sử dụng luôn:

```javascript
function getThreadId(link) {
  const matches = link.match(/\d+/g);
  const id = matches[matches.length - 1];
  const threadId = id.slice(0, 10) + "." + id.slice(10, id.length);
  console.log("threadId", threadId);
  return threadId;
}
```

Ví dụ mình muốn gửi một tin nhắn Hello World tới một channel, nó sẽ có dạng như sau:

![post message](/media/api.slack.com_methods_chat.postmessage_test.png "post message")

Tuy nhiên, với [chat.postMessage](https://api.slack.com/methods/chat.postMessage), bạn chỉ có thể gửi tin nhắn ngay tại thời điểm gửi request đi. Nếu muốn "hẹn giờ" thì làm thế nào? Thật may, Slack cung cấp cho ta thêm [chat.scheduleMessage](https://api.slack.com/methods/chat.scheduleMessage), có thể sử dụng để gửi một tin nhắn tại một thời điểm hẹn trước trong tương lai. Cách sử dụng y hệt [chat.postMessage](https://api.slack.com/methods/chat.postMessage), chỉ thêm duy nhất parameter `post_at` nhận vào là một UNIX timestamp, bạn có thể tính toán ra từ <https://www.epochconverter.com>.

### Giật lì xì

Voilà. Vậy là bên trên là khái quát cách bạn có thể sử dụng Slack API để gửi tin nhắn dưới danh tính của mình. Mình đã sử dụng cách này để giật lì xì từ cậu em, schedule một message vào đúng 12 giờ 1 giây, với suy nghĩ buffer thêm 1 giây chắc cũng chẳng có ai nhanh hơn được. Nghĩ rằng kèo này thơm rồi. Cho đến khi... có đến ba người khác ngồi rình đồng hồ, reply nhanh hơn và lì xì giá trị cao nhất tuột khỏi tầm tay 😭😭😭

### Known issue

Với các tin nhắn gửi bởi API, nó sẽ không khác gì tin nhắn gửi bởi chính bạn khi sử dụng Slack App/ Slack Web. Nhưng nếu bạn xem bằng Slack Mobile App, có thể avatar của tin nhắn đó sẽ có vấn đề.

### Kết thúc

Bài viết đã sơ lược cách bạn có thể gửi tin nhắn dưới danh tính của bạn bằng API, thậm chí có thể hẹn giờ gửi tin nhắn đó đi được nữa. Hi vọng nó sẽ giúp ích được bạn trong trường hợp cụ thể. Chúc mừng năm mới!
