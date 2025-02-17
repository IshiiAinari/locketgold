const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// Lấy thời gian hiện tại và tính ngày hết hạn vào năm sau
let now = new Date();
let nextYear = new Date(now);
nextYear.setFullYear(now.getFullYear() + 1);
let expiresDate = nextYear.toISOString().split('.')[0] + "Z"; // Định dạng ISO 8601

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var locket02 = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: expiresDate,
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: now.toISOString(),
  purchase_date: now.toISOString(),
  store: "app_store"
};

var locket01 = {
  grace_period_expires_date: null,
  purchase_date: now.toISOString(),
  product_identifier: "com.locket02.premium.yearly",
  expires_date: expiresDate
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [e, s] = mapping[match];
  s ? (locket01.product_identifier = s, obj.subscriber.subscriptions[s] = locket02)
    : obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
  obj.subscriber.entitlements[e] = locket01;
} else {
  obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
  obj.subscriber.entitlements.pro = locket01;
}

$done({ body: JSON.stringify(obj) });
