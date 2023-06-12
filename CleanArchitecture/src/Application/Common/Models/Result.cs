using System;
using System.Collections.Generic;
using System.Linq;

namespace CleanArchitecture.Application.Common.Models;

public class Result
{
    internal Result(bool succeeded, object data, string messenge)
    {
        Succeeded = succeeded;
        Messenge = messenge;
        Data = data;
    }

    public bool Succeeded { get; set; }

    public string Messenge { get; set; }
    public object Data { get; set; }


    public static Result Success(object data = null, string messenge = null)
    {
        return new Result(true, data, messenge);
    }

    public static Result Failure(string error = "Sorry, something went wrong please try again.")
    {
        return new Result(false, null, error);
    }
}
