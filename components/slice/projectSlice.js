const getUsers=async ()=>{
    try{
    const res = await fetch('localhost:8080/api/v1/users',{
        method: 'GET',    
        headers: { 'Content-Type': 'application/json' }
    }
    );
    if(!res.ok) throw new Error('Failed to fetch users');
    const data = await res.json();
    return data;
   } catch(error){
    console.error('Error fetching users:', error);
    return [];
   }
}