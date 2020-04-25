export default {
  getListCustomer: `
    SELECT customer, date
    FROM \`order\` as o
    LEFT JOIN order_hookah as orh ON orh.order_id = o.id
    WHERE date >= now()
    ORDER BY date;
  `,
  makeOrder: `CALL MakeOrderHookah(?,?,?)` // arguments : customer
}