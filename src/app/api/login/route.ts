import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  console.log('Backend apiURL', apiUrl)

  // Vars
  const { email, password } = await req.json()

  const res: any = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  console.log('data', data)

  if (res.status === 200) {
    /*
     * Please unset all the sensitive information of the user either from API response or before returning
     * user data below. Below return statement will set the user object in the token and the same is set in
     * the session which will be accessible all over the app.
     */
    return NextResponse.json({ response: data.data })
  } else {
    // We return 401 status code and error message if user is not found
    return NextResponse.json(
      {
        // We create object here to separate each error message for each field in case of multiple errors
        message: ['Email or Password is invalid']
      },
      {
        status: 401,
        statusText: 'Unauthorized Access'
      }
    )
  }
}
