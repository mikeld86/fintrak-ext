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
      const { data, error } = await supabase
        .from('inventory_batches')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const camelData = (data || []).map((row) => ({
        id: row.id,
        userId: row.user_id,
        batchName: row.batch_name,
        productName: row.product_name,
        totalPricePaid: row.total_price_paid,
        numberOfUnits: row.number_of_units,
        unitCost: row.unit_cost,
        projectedSaleCostPerUnit: row.projected_sale_cost_per_unit,
        actualSaleCostPerUnit: row.actual_sale_cost_per_unit,
        qtyInStock: row.qty_in_stock,
        qtySold: row.qty_sold,
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

      const camelData = {
        id: data.id,
        userId: data.user_id,
        batchName: data.batch_name,
        productName: data.product_name,
        totalPricePaid: data.total_price_paid,
        numberOfUnits: data.number_of_units,
        unitCost: data.unit_cost,
        projectedSaleCostPerUnit: data.projected_sale_cost_per_unit,
        actualSaleCostPerUnit: data.actual_sale_cost_per_unit,
        qtyInStock: data.qty_in_stock,
        qtySold: data.qty_sold,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(camelData)
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

      const camelData = {
        id: data.id,
        userId: data.user_id,
        batchName: data.batch_name,
        productName: data.product_name,
        totalPricePaid: data.total_price_paid,
        numberOfUnits: data.number_of_units,
        unitCost: data.unit_cost,
        projectedSaleCostPerUnit: data.projected_sale_cost_per_unit,
        actualSaleCostPerUnit: data.actual_sale_cost_per_unit,
        qtyInStock: data.qty_in_stock,
        qtySold: data.qty_sold,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return {
        statusCode: 200,
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