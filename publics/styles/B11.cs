using System;

namespace Application
{
    class MainClass
    {
        public static void Main(string[] args)
        {

            /** 
            Nhập số hạng đầu tiên của cấp số cộng,
             công sai của cấp số cộng, số lượng phần tử cần in.
            Sau đó in ra dãy cấp số cộng này:
            Ví dụ:  u1=5  d=3  n=10 
            In ra:   5,8,11,14,17,20,23,26,29,32
            **/


            Console.WriteLine("So hang dau tien:");
            int u = int.Parse(Console.ReadLine());
            Console.WriteLine("Cong Sai:");
            int d = int.Parse(Console.ReadLine());
            Console.WriteLine("Nhap so n");
            int n = int.Parse(Console.ReadLine());

            int[] arr = new int[n];

            for(int i = 0; i < n; i++){
                arr[i] = u;
                u += d;
            }

            foreach(var index in arr){
                Console.Write("{0}, ",index);
            }

        }
    }
}
