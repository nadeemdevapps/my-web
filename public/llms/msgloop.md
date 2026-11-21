# MsgLoop

> Markdown version of [the MsgLoop site](https://nadeem-dev-apps.pages.dev/products/msgloop/). MsgLoop is a local-first WhatsApp message scheduler for Android, by Nadeem Mazhar (Nadeem Dev Apps).

# Send the same message, up to 500 times — on schedule.

MsgLoop is a **local-first WhatsApp message scheduler** for Android. Log in once inside the app, then send one message up to 500 times — right now, or at a time you pick — and queue several tasks to run one after another. Everything runs on your phone: **no account, no server, no tracking**, and no data leaves the device except through WhatsApp itself.

Android app only — no separate live site.

Download the app (r68): https://github.com/nadeemdevapps/downloads/releases/download/msgloop-v1.0.0-r68/MsgLoop-v1.0.0.apk

## A warning before you use it

MsgLoop automates WhatsApp Web, which WhatsApp's Terms of Service do not allow — bulk messaging can get a number temporarily or permanently banned. Use it only on numbers you own or have permission to message. Keep the delay conservative for large counts, and prefer smaller batches.

## What MsgLoop does

- **Schedule for later** — start now, in 5, 15, or 30 minutes, in 1 or 3 hours, or at a clock time. An exact alarm fires the task at the time you picked when Android allows exact alarms.
- **Send now, up to 500 times** — one message to one number, repeated 1 to 500 times. The number must be 7–15 digits with its country code and no leading 0, and the message can span several lines.
- **A delay you control** — 0.3, 1, 2, or 5 seconds between sends, or a custom delay from 0 to 60 seconds. Longer delays are the safer choice for large counts.
- **A queue that runs one task at a time** — send-now tasks run first, then scheduled tasks in time order.
- **A queue that survives anything** — tasks are stored on the phone, so they survive the app being closed, the phone restarting, and alarms being cleared.
- **Keeps going in the background** — sending runs in a foreground service, so it continues with the app closed or the phone locked, with a notification showing progress.
- **Live progress and time estimate** — sent, failed, and remaining counts with a live estimate of the time left, and a live view of the WhatsApp Web page itself.
- **Stop, cancel, and reorder** — stop just the running task, stop everything including the queue, cancel any scheduled task, or move a task up or down.
- **Every send is verified** — each message is checked and retried once if it did not go through.
- **History of finished tasks** — the last 30 finished tasks stay on the phone, with the number, sent and failed counts, the result, and the first 200 characters of the message.
- **One-time login, saved on the phone** — scan the WhatsApp Web QR code once in the app's own browser, and the session is saved.
- **Private by design** — no account, no analytics, no tracking, no ads. Your login, tasks, and history stay on the phone; Android backup is off.

One task sends to one number. There is no daily or weekly repeat, no group chats, and no sending to several numbers at once.

## Frequently asked questions

### Does MsgLoop send the same message every day automatically?

No. Each MsgLoop task fires once, at the time you pick. There is no daily or weekly repeat.

### How many times can MsgLoop send one message?

Up to 500 times per task, to one number per task. Group chats are not supported — MsgLoop opens a one-to-one chat.

### Where do my messages and my WhatsApp login live?

On your phone only. MsgLoop has no account, no server, no analytics, and no tracking, and Android backup is off.

### What happens if my phone restarts before a scheduled send?

The task is not lost. Scheduled tasks are stored on the phone, their alarms are re-registered after a reboot, and a task whose time passed while the phone was off fires when the app opens again.

### Can WhatsApp ban my number for using MsgLoop?

Yes. MsgLoop automates WhatsApp Web, which WhatsApp's Terms of Service do not allow, and bulk messaging can get a number temporarily or permanently banned. Use it only on numbers you own or have permission to message.

## Built by Nadeem

MsgLoop was built by **Nadeem Mazhar**, a solo developer, as part of Nadeem Dev Apps.

## Pages

- [Home](https://nadeem-dev-apps.pages.dev/products/msgloop/)
- [Privacy](https://nadeem-dev-apps.pages.dev/products/msgloop/privacy/)
- [Terms](https://nadeem-dev-apps.pages.dev/products/msgloop/terms/)

More from Nadeem Dev Apps → https://nadeem-dev-apps.pages.dev/
