import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  // const getPasswords = async () => {
  //   let req = await fetch("http://localhost:3000");
  //   let passwords = await req.json();
  //   setpasswordArray(passwords);
  //   console.log(passwords);
  // };

  useEffect(() => {
    // getPasswords();
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current) {
      if (show) {
        ref.current.type = "password"; // Change input type to password
        setShow(false); // Update state to reflect "show" behavior
      } else {
        ref.current.type = "text"; // Change input type to text
        setShow(true); // Update state to reflect "hide" behavior
      }
    }
  };

  const bhejo = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      // the below 5 lines work at the time when a user is trying to edit the password. It basically deletes passwords with same ids if they already exist in the db
      // await fetch("http://localhost:3000/", {
      //   method: "DELETE",
      //   headers: { "Content-type": "application/json" },
      //   body: JSON.stringify({ id: form.id }),
      // });

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      // await fetch("http://localhost:3000/", {
      //   method: "POST",
      //   headers: { "Content-type": "application/json" },
      //   body: JSON.stringify({ ...form, id: uuidv4() }),
      // });
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      toast("Password saved!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setform({ site: "", username: "", password: "" });
    }
  };

  const deletePassword = async (id) => {
    console.log("Deleting password with id:", id);
    let c = confirm("Do you really want to delete this Password ?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      // let res = await fetch("http://localhost:3000/", {
      //   method: "DELETE",
      //   headers: { "Content-type": "application/json" },
      //   body: JSON.stringify({ id }),
      // });
      toast("Password deleted!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id:", id);
    setform({ ...passwordArray.filter((i) => i.id == id)[0], id: id });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clipboard!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className=" md:py-10 md:px-16 md:mx-auto md:container">
        <h1 className="text-4xl text-white font-bold text-center">
          <span className="text-green-600">&lt;</span>
          Pass<span className="text-green-600">MG/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center md:mt-14">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="bg-white rounded-lg border border-green-500 w-full px-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="bg-white rounded-lg border border-green-500 w-full md:w-[75%] px-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                ref={ref} // Attach ref to the input
                className="bg-white rounded-lg border border-green-500 w-full pl-4 pr-[3rem] py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute font-bold right-[5px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                {show ? "hide" : "show"}
              </span>
            </div>
          </div>
          <button
            onClick={bhejo}
            className="flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full gap-2 px-8 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#000000"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl text-white py-4">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-white text-center"> No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className=" table-fixed md:table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-1">Site</th>
                  <th className="py-1">Username</th>
                  <th className="py-1">Password</th>
                  <th className="py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-400">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-1 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            <span className="w--[0%] overflow-hidden">
                              {item.site}
                            </span>
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-1 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-1 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-1 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
