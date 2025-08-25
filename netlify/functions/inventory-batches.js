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

    // Helper to convert database fields (snake_case) to camelCase
    const toCamelCase = (batch) => ({
      id: batch.id,
      userId: batch.user_id,
      batchName: batch.batch_name,
      productName: batch.product_name,
      totalPricePaid: batch.total_price_paid,
      numberOfUnits: batch.number_of_units,
      unitCost: batch.unit_cost,
      projectedSaleCostPerUnit: batch.projected_sale_cost_per_unit,
      actualSaleCostPerUnit: batch.actual_sale_cost_per_unit,
      qtyInStock: batch.qty_in_stock,
      qtySold: batch.qty_sold,
      createdAt: batch.created_at,
      updatedAt: batch.updated_at,
    });

    if (httpMethod === 'GET') {
      const { data, error } = await supabase
        .from('inventory_batches')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const camelData = (data || []).map(toCamelCase);

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
        batch_name: requestData.batchName,
        product_name: requestData.productName,
        total_price_paid: requestData.totalPricePaid || '0',
        number_of_units: requestData.numberOfUnits || 0,
        unit_cost: requestData.unitCost || '0',
        projected_sale_cost_per_unit: requestData.projectedSaleCostPerUnit || '0',
        actual_sale_cost_per_unit: requestData.actualSaleCostPerUnit || '0',
        qty_in_stock: requestData.qtyInStock || 0,
        qty_sold: requestData.qtySold || 0,
      };
      
      const { data, error } = await supabase
        .from('inventory_batches')
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(toCamelCase(data))
      };
    }

    if (httpMethod === 'PUT') {
      const requestData = JSON.parse(event.body);
      const pathParts = event.path.split('/');
      const batchId = pathParts[pathParts.length - 1];
      
      // Map frontend camelCase to database snake_case
      const dbData = {
        batch_name: requestData.batchName,
        product_name: requestData.productName,
        total_price_paid: requestData.totalPricePaid || '0',
        number_of_units: requestData.numberOfUnits || 0,
        unit_cost: requestData.unitCost || '0',
        projected_sale_cost_per_unit: requestData.projectedSaleCostPerUnit || '0',
        actual_sale_cost_per_unit: requestData.actualSaleCostPerUnit || '0',
        qty_in_stock: requestData.qtyInStock || 0,
        qty_sold: requestData.qtySold || 0,
      };
      
      const { data, error } = await supabase
        .from('inventory_batches')
        .update(dbData)
        .eq('id', batchId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(toCamelCase(data))
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