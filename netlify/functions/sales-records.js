const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { httpMethod } = event;
    const userId = "46429020";

    if (httpMethod === 'GET') {
      const batchId = event.queryStringParameters ? event.queryStringParameters.batchId : undefined;
      let query = supabase
        .from('sales_records')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (batchId) {
        query = query.eq('batch_id', batchId);
      }
      const { data, error } = await query;

      if (error) throw error;

      const camelData = (data || []).map((row) => ({
        id: row.id,
        userId: row.user_id,
        batchId: row.batch_id,
        qty: row.qty,
        pricePerUnit: row.price_per_unit,
        totalPrice: row.total_price,
        amountPaid: row.amount_paid,
        balanceOwing: row.balance_owing,
        notes: row.notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(camelData)
      };
    }

    if (httpMethod === 'POST') {
      const requestData = JSON.parse(event.body);
      
      // Map frontend camelCase to database snake_case  
      const dbData = {
        user_id: userId,
        batch_id: requestData.batchId,
        qty: requestData.qty || requestData.quantity,
        price_per_unit: requestData.pricePerUnit || requestData.price_per_unit,
        total_price: requestData.totalPrice || requestData.total_price,
        amount_paid: requestData.amountPaid || requestData.amount_paid,
        balance_owing: requestData.balanceOwing || requestData.balance_owing || '0',
        notes: requestData.notes || '',
      };
      
      const { data, error } = await supabase
        .from('sales_records')
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;

      const camelData = {
        id: data.id,
        userId: data.user_id,
        batchId: data.batch_id,
        qty: data.qty,
        pricePerUnit: data.price_per_unit,
        totalPrice: data.total_price,
        amountPaid: data.amount_paid,
        balanceOwing: data.balance_owing,
        notes: data.notes,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(camelData)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};