using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CleanArchitecture.Application.Common.JsonExtensions;
public static class JsonExtensions
{
    public static void SetByPath(this JToken obj, string path, JToken value)
    {
        JToken token = obj.SelectToken(path);
        token.Replace(value);
    }

    public static List<JToken> FindTokens(this JToken containerToken, string name, string value)
    {
        List<JToken> matches = new List<JToken>();
        FindTokens(containerToken, name, value, matches);
        return matches;
    }

    private static void FindTokens(JToken containerToken, string name, string value, List<JToken> matches)
    {
        if (containerToken.Type == JTokenType.Object)
        {
            foreach (JProperty child in containerToken.Children<JProperty>())
            {
                if (child.Name == name && child.Value.ToString() == value)
                {
                    matches.Add(child.Value);
                }
                FindTokens(child.Value, name, value, matches);
            }
        }
        else if (containerToken.Type == JTokenType.Array)
        {
            foreach (JToken child in containerToken.Children())
            {
                FindTokens(child, name, value, matches);
            }
        }
    }
    public static bool IsValidJson(string strInput)
    {
        if (string.IsNullOrWhiteSpace(strInput)) { return false; }
        strInput = strInput.Trim();
        if ((strInput.StartsWith("{") && strInput.EndsWith("}")) || //For object
            (strInput.StartsWith("[") && strInput.EndsWith("]"))) //For array
        {
            try
            {
                var obj = JToken.Parse(strInput);
                return true;
            }
            catch (JsonReaderException jex)
            {
                return false;
            }
            catch (Exception ex) //some other exception
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
}
