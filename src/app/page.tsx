

import Link from 'next/link';


export default function Home() {

  return (
    <>

      <div className="flex flex-col items-center h-{screen} ">
      <div className="card mb-[10%] ">
          <p>Artisan Club</p>
      </div>
      <div className="card sm:w-[80%] md:w-[35%] h-[60%]  p-6 rounded-lg flex flex-col justify-between  bg-gray-300" >
        <div className="mb-4">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              Your Personal Bot...
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">
              Hello there <br /> Login To start your day!!!
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              Your Personal Bot...
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">
              Start you journey by <br />Login Into your Account<br/> or Create a new one 
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header">
            Your Personal Bot...
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">Login!</div>
            <div className="chat-footer opacity-50">
              Seen at 12:46
            </div>
          </div>
          <div className="ml-12">
          <Link href="/login">
            <button className="btn btn-outline btn-secondary w-full">Login!!!</button>
          </Link>

          </div>

        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="chat-header">
          Your Personal Bot...
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">Sign Up</div>
          <div className="chat-footer opacity-50">
            Seen at 12:46
          </div>
        </div>
        <div className="ml-12">
        <Link href="/signup">
        <button className="btn btn-outline btn-secondary w-[100%] ">Sign up!!!</button>
        </Link>
          
        </div>
        </div>
      </div>

    </div>


    </>
  
  );
}
