import MobileHeader from "../../Header/mobile";
import MobileNav from "../../NavBar/mobile";
import UserRow from "../UserRow";

const FriendMobile = ({suggestions,friends,sentRequests,pendingRequests,handleAcceptRequest, handleCancelRequest,handleSendRequest }) => {
    return (
        <>
        <MobileHeader />
        <main className="flex-grow pt-20 px-4 space-y-8 max-w-2xl mx-auto w-full">
          {pendingRequests.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase mb-4">Zaproszenia oczekujące</h3>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-solid border-slate-100 dark:border-slate-800">
                {pendingRequests.map(r => <UserRow key={r._id} person={r} type="request" handleAcceptRequest={handleAcceptRequest} handleCancelRequest={handleCancelRequest} handleSendRequest={handleSendRequest} />)}
              </div>
            </section>
          )}
          
          {sentRequests.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase mb-4">Wysłane zaproszenia</h3>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-solid border-slate-100 dark:border-slate-800">
                {sentRequests.map(r => <UserRow key={r._id} person={r} type="sent" handleAcceptRequest={handleAcceptRequest} handleCancelRequest={handleCancelRequest} handleSendRequest={handleSendRequest} />)}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-sm font-bold uppercase mb-4">Twoja Lista</h3>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-solid border-slate-100 dark:border-slate-800">
              {friends.length > 0 ? friends.map(f => <UserRow key={f._id} person={f} type="friend" handleAcceptRequest={handleAcceptRequest} handleCancelRequest={handleCancelRequest} handleSendRequest={handleSendRequest} />) : <p className="p-8 text-center text-slate-400">Brak znajomych.</p>}
            </div>
          </section>
          
          <section>
            <h3 className="text-sm font-bold uppercase mb-4">Sugerowani</h3>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-solid border-slate-100 dark:border-slate-800">
              {suggestions.map(s => <UserRow key={s._id} person={s} type="suggestion" handleAcceptRequest={handleAcceptRequest} handleCancelRequest={handleCancelRequest} handleSendRequest={handleSendRequest} />)}
            </div>
          </section>
        </main>
        <MobileNav />
        </>
    )
}

export default FriendMobile;