async function testLogin() {
    try {
        const response = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'amreshanand8241@gmail.com',
                password: 'Amresh@8241'
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ Login successful:', data.success);
            console.log('👤 User:', data.data.user.name);
        } else {
            console.error('❌ Login failed:', data);
        }
    } catch (error) {
        console.error('❌ Request error:', error.message);
    }
}

testLogin();
