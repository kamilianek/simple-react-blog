/**
 * Created by kamilianek on 29.05.18.
 */

export default function getUserName(mail, id) {
  const splittedMail = mail.split('@');
  return splittedMail[0] + id;
}
