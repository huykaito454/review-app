using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.Common.Interfaces;
public interface IHttpRequestService<T, TResponse>
{
    Task<Stream> GetStream(string url, Dictionary<string, string> headers = null);
    Task<TResponse> GetRequest(string url, Dictionary<string, string> headers = null);
    Task<bool> PostRequest(string url, T postObject, Dictionary<string, string> headers = null);
    Task<bool> PutRequest(string url, T postObject, Dictionary<string, string> headers = null);
    Task<bool> DeleteRequest(string url, Dictionary<string, string> headers = null);
    Task<TResponse> PostAndReceiveResultObject(string url, T postObject, Dictionary<string, string> headers = null);
    Task<TResponse> PutAndReceiveResultObject(string url, T postObject, Dictionary<string, string> headers = null);
    void AddHeaders(Dictionary<string, string> headers);
}
