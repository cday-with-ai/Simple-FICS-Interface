#!/usr/bin/env node

const https = require('https');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is required');
  console.error('Set it with: export ANTHROPIC_API_KEY=your_api_key_here');
  process.exit(1);
}

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.anthropic.com',
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      }
    };

    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function checkAPIAccess() {
  console.log('Checking Anthropic API access...\n');

  try {
    // Test API access by making a simple request
    const testResponse = await makeRequest('/v1/messages', 'POST', {
      model: 'claude-3-haiku-20240307',
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Hello' }]
    });

    if (testResponse.status === 200) {
      console.log('✅ API access successful');
      console.log('Available models based on your access:');
      
      // List of models to test
      const modelsToTest = [
        'claude-3-opus-20240229',
        'claude-3-sonnet-20240229',
        'claude-3-haiku-20240307',
        'claude-3-5-sonnet-20241022',
        'claude-3-5-haiku-20241022',
        'claude-opus-4-20250514',
        'claude-sonnet-4-20250514'
      ];

      for (const model of modelsToTest) {
        try {
          const modelTest = await makeRequest('/v1/messages', 'POST', {
            model: model,
            max_tokens: 1,
            messages: [{ role: 'user', content: 'test' }]
          });

          if (modelTest.status === 200) {
            console.log(`✅ ${model} - Available`);
          } else if (modelTest.status === 400 && modelTest.data.error?.message?.includes('model')) {
            console.log(`❌ ${model} - Not available`);
          } else {
            console.log(`⚠️  ${model} - ${modelTest.data.error?.message || 'Unknown status'}`);
          }
        } catch (error) {
          console.log(`❌ ${model} - Error: ${error.message}`);
        }
      }

    } else {
      console.log('❌ API access failed');
      console.log('Status:', testResponse.status);
      console.log('Response:', testResponse.data);
    }

  } catch (error) {
    console.error('❌ Error checking API:', error.message);
  }
}

// Note: Anthropic doesn't have a public usage endpoint, so we can't check usage directly
console.log('📝 Note: Anthropic API does not provide a public usage endpoint.');
console.log('To check usage, visit: https://console.anthropic.com\n');

checkAPIAccess();