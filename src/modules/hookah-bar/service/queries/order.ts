export default {
  getListCustomer: `
    SELECT customer, date
    FROM \`order\` as o
    LEFT JOIN order_hookah as orh ON orh.order_id = o.id
    WHERE date >= now()
    ORDER BY date;
  `,
  makeOrder: `CALL make_order_hookah_procedure(?,?,?)`,
  getFreeHookah: `CALL get_free_hookahs_procedure(?,?,?)`
}