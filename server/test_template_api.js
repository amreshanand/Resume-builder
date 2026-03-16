// No axios needed

async function testTemplateAPI() {
    try {
        // Need to login first to get token
        const loginRes = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'amreshanand8241@gmail.com',
                password: 'Amresh@8241'
            })
        });
        const loginData = await loginRes.json();
        
        if (!loginData.success) {
            console.error('Login failed:', loginData);
            return;
        }

        const token = loginData.token;

        // Try to create a template
        const createRes = await fetch('http://localhost:5001/api/admin/templates', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: 'Test Admin Template',
                category: 'Engineering',
                description: 'Created via test script',
                isActive: true,
                isPremium: false,
                tags: ['test', 'engineering'],
                sections: { test: 'data' }
            })
        });
        const createData = await createRes.json();
        console.log('Create Result:', createData);

        // Try to get templates
        const getRes = await fetch('http://localhost:5001/api/admin/templates', {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
        const getData = await getRes.json();
        console.log('Get Count:', getData.count);

    } catch (error) {
        console.error('API Test Error:', error);
    }
}

testTemplateAPI();
